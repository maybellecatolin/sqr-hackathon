export type Vote = { user: string; score: number };
export type Story = {
  id: string;
  title: string;
  finalScore: number;
  votes: Vote[];
};

export type Sprint = {
  id: string;
  name: string;
  stories: Story[];
};

const users = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve', 'Frank', 'Grace', 'Hank'];

const frontendTasks = [
  'Implement login page UI',
  'Style the dashboard components with Tailwind CSS',
  'Integrate user profile editing modal',
  'Build responsive navbar and sidebar layout',
  'Add error handling UI for form validations',
];

const backendTasks = [
  'Set up user authentication endpoints',
  'Implement sprint and story models with validation',
  'Integrate database migrations for story voting',
  'Add API endpoints for sprint and story fetching',
  'Handle user session and JWT authentication logic',
];

const storyTasks = [
    [
      'Design UI mockups',
      'Write component unit tests',
      'Review accessibility',
    ],
    [
      'Create API schema',
      'Write integration tests',
      'Document endpoints',
    ],
    [
      'Implement responsive layout',
      'Fix browser bugs',
      'Add animation effects',
    ],
    [
      'Set up database migrations',
      'Optimize queries',
      'Code review and refactoring',
    ],
    [
      'Handle error states',
      'Improve form validation',
      'Add loading spinners',
    ],
  ];
  
  export const dummySprints: Sprint[] = Array.from({ length: 10 }, (_, i) => {
    const sprintNum = i + 1;
    const randomFrontend = frontendTasks[i % frontendTasks.length];
    const randomBackend = backendTasks[(i + 1) % backendTasks.length];
  
    return {
      id: `sprint-${sprintNum}`,
      name: `Sprint 1.${30+sprintNum}.0`,
      description: `Focus: ${randomFrontend} (Frontend) and ${randomBackend} (Backend).`,
      stories: Array.from({ length: 5 }, (_, j) => {
        const storyNum = j + 1;
        const votes = users.map(user => ({
          user,
          score: Math.floor(Math.random() * 10) + 1,
        }));
        const finalScore =
          Math.round(votes.reduce((sum, v) => sum + v.score, 0) / votes.length);
        return {
          id: `story-${sprintNum}-${storyNum}`,
          title: `User Story ${storyNum}`,
          description: storyTasks[j % storyTasks.length],
          finalScore,
          votes,
        };
      }),
    };
  });
