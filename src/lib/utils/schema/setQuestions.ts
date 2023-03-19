import type { Question } from '../../types.js';

export function setQuestions(questions: Question[]) {
  if (questions && questions.length) {
    return questions.map(question => ({
      '@type': 'Question',
      name: question.questionName,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.acceptedAnswerText,
      },
    }));
  }
  return undefined;
}