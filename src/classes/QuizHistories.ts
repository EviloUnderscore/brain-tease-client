import { QuizHistory } from "./QuizHistory";

export class QuizHistories{
    histories: QuizHistory[];

    constructor() {
        this.histories = [];
    }

    public addAll(histories: any){
        for (let h of histories) {
            let history = new QuizHistory();
            history.serialize(h);
            this.addQuiz(history);
        }       
    }

    public addQuiz(history: QuizHistory) {
        this.histories.push(history);
    }

    public getHistoriesByUserAndQuiz(userId: string, quizId: string): QuizHistories{

        const userHistories = this.getHistoriesByUserId(userId);
        const userAndQuizHistories = userHistories.getHistoriesByQuizId(quizId);
        
        return userAndQuizHistories
    }

    public getHistoriesByQuizId(quiz_id: string): QuizHistories{
        const filteredHistories = new QuizHistories();

        for (const history of this.histories) {
            if (history.quiz_id === quiz_id) {
                filteredHistories.addQuiz(history);
            }
        }

        return filteredHistories;
    }

    public getHigherScore(): number{
        let highestScore = 0;
    
        for (let history of this.histories) {
            if (history.score > highestScore) {
                highestScore = history.score;
            }
        }
    
        return highestScore;
    }

    public getTopScores(histories: QuizHistories): QuizHistories{

        const scoreboard = new QuizHistories();
        // Create an empty map to store the highest scores for each user_id
        const highestScoresMap = new Map<string, number>();

        // Iterate over the histories array to find the highest scores for each user_id
        for (const history of histories) {
            const { user_id, score } = history;

            // Check if the user_id already exists in the map
            if (highestScoresMap.has(user_id)) {
            // If the score is higher than the existing score in the map, update it
                if (score > highestScoresMap.get(user_id)!) {
                    highestScoresMap.set(user_id, score);
                }
                } else {
                // If the user_id doesn't exist in the map, add it with the score
                highestScoresMap.set(user_id, score);
                }
        }

        // Sort the highest scores in descending order
        const sortedScores = Array.from(highestScoresMap.values()).sort((a, b) => b - a);

        for(let score of highestScoresMap){
            const scoreHistory = new QuizHistory();
            scoreHistory.user_id = score[0];
            scoreHistory.score = score[1];
            scoreboard.addQuiz(scoreHistory);
        }
        
        return scoreboard;
    }

    public getNbOfParticipants(): number{
        let nbOfParticipants = 0
        const participants = new Set(); // Using a Set to store unique user IDs
            for (const history of this.histories) {
                const userId = history.user_id;

                if (!participants.has(userId)) {
                    participants.add(userId);
                    nbOfParticipants++;
                }
            }
            
        return nbOfParticipants;
    }

    private getHistoriesByUserId(userId: string): QuizHistories{
        const filteredHistories = new QuizHistories();

        for (const history of this.histories) {
            if (history.user_id === userId) {
                filteredHistories.addQuiz(history);
            }
        }

        return filteredHistories;
    }

    public isEmpty(): boolean{
        return this.histories.length <= 0;
    }

    [Symbol.iterator]() {
        let index = 0;
        const histories = this.histories;

        return {
            next(): IteratorResult<QuizHistory> {
                if (index < histories.length) {
                    return {
                        value: histories[index++],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }
}