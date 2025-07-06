export interface Quote {
  quote: string;
  author: string;
}

export interface Question {
  questionHeading: string;
  questionLink: string;
  gfgLink: string;
  leetCodeLink: string;
  youTubeLink: string;
  isDone: boolean;
  isBookmarked: boolean;
  userNotes: string;
  questionIndex: number;
  questionId: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryTotalQuestions: number;
  categoryCompletedQuestions: number;
  questionList: Question[];
}

export interface Topic {
  contentPath: string;
  contentHeading: string;
  contentSubHeading: string;
  contentUserNotes: string;
  contentTotalQuestions: number;
  contentCompletedQuestions: number;
  categoryList: Category[];
}

export interface Header {
  motivationalQuotes: Quote[];
  darkMode: boolean;
  isBookmarkFilterRequired: boolean;
  totalQuestions: number;
  completedQuestions: number;
}

export interface UltimateData {
  data: {
    header: Header;
    content: Topic[];
  };
}

export interface UserProgress {
  completedQuestions: Record<string, boolean>;
  bookmarkedQuestions: Record<string, boolean>;
  notes: Record<string, string>;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'all';

export interface UserAuth {
  isLoggedIn: boolean;
  username: string;
  email: string;
} 