import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Question from './models/Question';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sampleQuestions = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Microsoft"],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Only one valid answer exists."
    ]
  },
  {
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "Easy",
    category: ["Linked List"],
    companies: ["Microsoft", "Amazon", "Facebook"],
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The linked list is reversed."
      }
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    category: ["String", "Stack"],
    companies: ["Google", "Facebook", "Amazon"],
    examples: [
      {
        input: "s = \"()[]{}\"",
        output: "true",
        explanation: "All brackets are properly closed."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'"
    ]
  },
  {
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
    difficulty: "Easy",
    category: ["Array", "Binary Search"],
    companies: ["Amazon", "Microsoft", "Google"],
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4"
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a sorted list.",
    difficulty: "Easy",
    category: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Facebook"],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "The merged list is sorted."
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100"
    ]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    difficulty: "Medium",
    category: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Google", "Microsoft"],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    difficulty: "Easy",
    category: ["Dynamic Programming"],
    companies: ["Amazon", "Google", "Adobe"],
    examples: [
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1+1+1, 1+2, 2+1"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and another day to sell.",
    difficulty: "Easy",
    category: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Facebook", "Microsoft"],
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ]
  },
  {
    title: "Implement Queue using Stacks",
    description: "Implement a first in first out (FIFO) queue using only two stacks.",
    difficulty: "Easy",
    category: ["Stack", "Queue", "Design"],
    companies: ["Microsoft", "Amazon", "Bloomberg"],
    examples: [
      {
        input: "['MyQueue', 'push', 'push', 'peek', 'pop', 'empty']",
        output: "[null, null, null, 1, 1, false]",
        explanation: "Queue operations executed successfully"
      }
    ],
    constraints: [
      "1 <= x <= 9",
      "At most 100 calls will be made"
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: ["String", "Hash Table", "Sliding Window"],
    companies: ["Amazon", "Google", "Facebook"],
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ]
  },
  {
    title: "3Sum",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    difficulty: "Medium",
    category: ["Array", "Two Pointers"],
    companies: ["Amazon", "Facebook", "Microsoft"],
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "Distinct triplets that sum to zero."
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ]
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container that contains the most water.",
    difficulty: "Medium",
    category: ["Array", "Two Pointers"],
    companies: ["Amazon", "Facebook", "Google"],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The maximum area is between indices 1 and 8."
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5"
    ]
  },
  {
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    difficulty: "Medium",
    category: ["Array"],
    companies: ["Amazon", "Facebook", "Microsoft"],
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "Product excluding each element."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "You must write an algorithm that runs in O(n) time"
    ]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    description: "Suppose an array of length n sorted in ascending order is rotated. Find the minimum element.",
    difficulty: "Medium",
    category: ["Array", "Binary Search"],
    companies: ["Amazon", "Microsoft", "Facebook"],
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "The original array was [1,2,3,4,5] rotated 3 times."
      }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000"
    ]
  },
  {
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    difficulty: "Medium",
    category: ["Array", "Sorting"],
    companies: ["Facebook", "Google", "Amazon"],
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Intervals [1,3] and [2,6] overlap, so they are merged."
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4"
    ]
  }
];

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log(`✅ Added ${sampleQuestions.length} sample questions`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
