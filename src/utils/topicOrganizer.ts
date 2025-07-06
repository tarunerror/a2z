import { Topic } from '@/types';
import { ultimateData } from '@/data/ultimateDataTS';

// Define the order of topics as specified
const topicOrder = [
  'Basics',
  'Sorting Techniques',
  'Arrays',
  'Binary Search',
  'Strings',
  'Linked List',
  'Recursion',
  'Two Pointers',
  'Bit Manipulation',
  'Stack & Queue',
  'Heaps',
  'Greedy Algorithms',
  'Binary Tree',
  'Binary Search Tree',
  'Graphs',
  'Dynamic Programming',
  'Tries',
  'Strings (Hard Problems and Standard Algorithms)',
];

// Map the topic headings to their corresponding slugs in the data
const topicMapping: Record<string, string> = {
  'Basics': 'basics',
  'Sorting Techniques': 'sorting',
  'Arrays': 'arrays',
  'Binary Search': 'binary_search',
  'Strings': 'strings_part_1',
  'Linked List': 'linked_list',
  'Recursion': 'recursion',
  'Two Pointers': 'two_pointers',
  'Bit Manipulation': 'bit_manipulation',
  'Stack & Queue': 'stacks_queues',
  'Heaps': 'heaps',
  'Greedy Algorithms': 'greedy',
  'Binary Tree': 'binary_trees',
  'Binary Search Tree': 'binary_search_trees',
  'Graphs': 'graphs',
  'Dynamic Programming': 'dynamic_programming',
  'Tries': 'tries',
  'Strings (Hard Problems and Standard Algorithms)': 'strings_part_2',
};

/**
 * Organizes topics according to the specified order
 * @returns Organized array of topics
 */
export function getOrganizedTopics(): Topic[] {
  const allTopics = ultimateData.data.content;
  const organizedTopics: Topic[] = [];
  
  // First, add topics in the specified order if they exist
  topicOrder.forEach(topicName => {
    const slug = topicMapping[topicName];
    const topic = allTopics.find(t => t.contentPath.includes(slug));
    
    if (topic) {
      // Update the topic heading to match our desired name
      const updatedTopic = {
        ...topic,
        contentHeading: topicName
      };
      organizedTopics.push(updatedTopic);
    } else {
      // If topic doesn't exist in data, create a placeholder
      // This is optional and can be removed if you don't want placeholders
      organizedTopics.push({
        contentPath: `/${topicMapping[topicName] || topicName.toLowerCase().replace(/\s+/g, '_')}`,
        contentHeading: topicName,
        contentSubHeading: 'Coming soon',
        contentUserNotes: '',
        contentTotalQuestions: 0,
        contentCompletedQuestions: 0,
        categoryList: []
      });
    }
  });
  
  // Then add any remaining topics that weren't in our specified order
  allTopics.forEach(topic => {
    const isAlreadyIncluded = organizedTopics.some(
      t => t.contentPath === topic.contentPath
    );
    
    if (!isAlreadyIncluded) {
      organizedTopics.push(topic);
    }
  });
  
  return organizedTopics;
} 