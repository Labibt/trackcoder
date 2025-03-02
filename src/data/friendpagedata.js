 const MOCK_DATA = {
  user: {
    userId: "testuserLGC3",
    name: "Test User 3",
    email: "testuserLGC3@example.com",
    gfg_data: {
      total_solved: 45,
      easy: 15,
      medium: 20,
      hard: 10,
      rating: 1800,
      badge: "No Badge",
      question_solved: [
        {
          _id: "6733a21a8b6a1334475f60b32d",
          title: "Add three Numbers",
          difficulty: "Medium",
          link: "https://practice.geeksforgeeks.org/problems/add-three-numbers/",
        },
        {
          _id: "6733a21a8b6a1334475f60b32e",
          title: "Binary Search",
          difficulty: "Easy",
          link: "https://practice.geeksforgeeks.org/problems/binary-search/",
        }
      ]
    },
    leetcode_data: {
      total_solved: 20,
      easy: 4,
      medium: 13,
      hard: 3,
      rating: 2000,
      badge: "No Badge",
      question_solved: [
        {
          _id: "673a21a8b6a134475f60b32a",
          title: "Two Sum",
          difficulty: "Easy",
          link: "https://leetcode.com/problems/two-sum/",
        }
      ]
    },
    codechef_data: {
      total_solved: 75,
      rating: 1500,
      badge: "No Badge",
      question_solved: []
    }
  },
  friend: {
    _id: "6743884df5da3d4c35572d8c",
    name: "vikash",
    gfg_data: {
      total_solved: 55,
      easy: 20,
      medium: 25,
      hard: 10,
      rating: 2000,
      badge: "Gold",
      question_solved: [
        {
          _id: "673c30e077b702a0a148e5c5",
          title: "Geek Jump",
          difficulty: "Easy",
          link: "https://practice.geeksforgeeks.org/problems/geek-jump/0",
        },
        {
          _id: "673c30e077b702a0a148e5e6",
          title: "Subset Sum Problem",
          difficulty: "Medium",
          link: "https://practice.geeksforgeeks.org/problems/subset-sum-problem-1611555638/0",
        }
      ]
    },
    leetcode_data: {
      total_solved: 30,
      easy: 10,
      medium: 15,
      hard: 5,
      rating: 1800,
      badge: "Guardian",
      question_solved: [
        {
          _id: "673a21a8b6a134475f60b32a",
          title: "Two Sum",
          difficulty: "Easy",
          link: "https://leetcode.com/problems/two-sum/",
        }
      ]
    },
    codechef_data: {
      total_solved: 0,
      rating: 0,
      badge: "No Badge",
      question_solved: []
    }
  }
};

export default MOCK_DATA;