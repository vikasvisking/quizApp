
import { gql, useQuery } from '@apollo/client';
import { useEffect, useMemo, useState, useRef } from 'react';

const GET_QUESTIONS = gql`
  {
    countries {
      name
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

const useQuestion = () => {
    const { loading, error, data } = useQuery(GET_QUESTIONS);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [ currentStartTime, setStartTime ] = useState(new Date())
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [elapsedTime, setElapsedTime] = useState(0);
    const interval = useRef(null)

    const getCurrentAnswer = useMemo(() => {
        return selectedAnswer[currentQuestion]
    }, [currentQuestion, selectedAnswer])

    const getRandomItems = (array, n) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    };

    const getCurrentQuestion = useMemo(() => {
        return questions.length > 0 ? questions[currentQuestion] : null
    }, [currentQuestion])

    const resetInterval = () => {
        if (interval.current) {
            clearInterval(interval.current)
            interval.current = null;
        }
    }

    const calculateScore = () => {
        let score = 0
        questions.forEach((item, index) => {
            const answer = selectedAnswer[index] 
            if (answer && item.answer && item.answer === answer) score += 1
        })
        resetInterval()
        return score
    }

    const generateQuestions = () => {
        const questionsArr = [];
        const countries = data.countries;

        countries.forEach((country) => {
            const correctContinent = country.continent.name;
            const correctLanguage = country.languages[0]?.name;

            if (correctContinent) {
                const otherContinents = getRandomItems(
                    [ ...new Set(countries.filter((c) => c.continent.name !== correctContinent).map((c) => c.continent.name))],
                    3
                );
                const continentOptions = [correctContinent, ...otherContinents].sort(() => Math.random() - 0.5);
                questionsArr.push({
                    question: `Which continent is ${country.name} located in?`,
                    options: continentOptions,
                    answer: correctContinent
                });
            }

            if (correctLanguage) {
                const otherLanguages = getRandomItems(
                    [...new Set(countries.filter((c) => c.languages[0]?.name !== correctLanguage).map((c) => c.languages[0]?.name))],
                    3
                );
                const languageOptions = [...new Set([correctLanguage, ...otherLanguages])].sort(() => Math.random() - 0.5);
                questionsArr.push({
                    question: `What is a language spoken in ${country.name}?`,
                    options: languageOptions,
                    answer: correctLanguage
                });
            }
        });

        const randomQuestions = getRandomItems(questionsArr, 10);
        setQuestions(randomQuestions)
        setCurrentQuestion(0)
    };

    const startClock = () => {
        resetInterval()
        setStartTime(new Date())
    }

    const getElaspedTime = useMemo(() => {
        const timeStamp = new Date(elapsedTime * 1000).toISOString()
        if (elapsedTime > 3600) return timeStamp.substring(11, 19)
        if (elapsedTime > 60) return timeStamp.substring(14, 19)
        return `${elapsedTime} secs`
    }, [elapsedTime])

    useEffect(() => {
        if (interval.current) return;
        interval.current = setInterval(() => {
            if (currentStartTime) {
              const now = new Date();
              setElapsedTime(Math.floor((now.getTime() - currentStartTime.getTime()) / 1000));
            }
          }, 1000);
    }, [currentStartTime])

    const handleNext = () => {
        setCurrentQuestion(prev => prev + 1);
        startClock()
    };

    const handlePrevious = () => setCurrentQuestion(prev => prev - 1);

    const handleAnswerClick = (item) => {
        setSelectedAnswer({
            ...selectedAnswer,
            [currentQuestion]: item
        })
    }

    useEffect(() => {
        if (data) generateQuestions()
    }, [data])

    return { loading, error, questions, getCurrentQuestion, currentQuestion, handleNext, handlePrevious, handleAnswerClick, getCurrentAnswer, selectedAnswer, calculateScore, getElaspedTime }
}

export default useQuestion;