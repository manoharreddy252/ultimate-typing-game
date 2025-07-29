export const typingTexts = {
  easy: [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is perfect for typing practice.",
    "Programming is the art of telling another human being what one wants the computer to do. It requires patience and creativity.",
    "Technology is best when it brings people together. The internet has connected billions of people across the globe.",
    "Artificial intelligence will revolutionize how we work and live. Machine learning algorithms are becoming more sophisticated.",
    "Web development involves creating websites and applications. HTML, CSS, and JavaScript are the fundamental technologies."
  ],
  
  medium: [
    "In the realm of software engineering, debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly. A programmer is ideally an essayist who works with traditional aesthetic and literary forms.",
    "Computer science is no more about computers than astronomy is about telescopes. The discipline of computing is the systematic study of algorithmic processes that describe and transform information.",
    "Object-oriented programming increases the value of these metrics by managing this complexity. The most important property of a program is whether it accomplishes the intention of its user.",
    "Functional programming is a programming paradigm where programs are constructed by applying and composing functions. It is a declarative programming paradigm in which function definitions are trees of expressions."
  ],
  
  hard: [
    "The fundamental principle of recursive design is to make the problem you are solving smaller at each step. Recursion is a method of solving problems that involves breaking a problem down into smaller and smaller subproblems until you get to a small enough problem that it can be solved trivially.",
    "Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once. Concurrency is about structure, parallelism is about execution. Concurrency provides a way to structure a solution to solve a problem that may (but not necessarily) be parallelizable.",
    "The essence of XML is this: the problem it solves is not hard, and it does not solve the problem well. XML is verbose, cumbersome, and redundant. It is not well-suited to human editing, and it is not well-suited to machine processing either.",
    "Microservices architecture is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API.",
    "Blockchain technology is essentially a distributed database of records or public ledger of all transactions or digital events that have been executed and shared among participating parties. Each transaction is verified by consensus of a majority of participants."
  ],
  
  code: [
    `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    
    `const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};`,
    
    `class BinarySearchTree {
  constructor(public value: number, public left?: BinarySearchTree, public right?: BinarySearchTree) {}
  
  insert(value: number): void {
    if (value < this.value) {
      this.left ? this.left.insert(value) : this.left = new BinarySearchTree(value);
    } else {
      this.right ? this.right.insert(value) : this.right = new BinarySearchTree(value);
    }
  }
}`,
    
    `async function fetchUserData(userId: string): Promise<User> {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}`,
    
    `const useTypingGame = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const handleKeyPress = useCallback((key: string) => {
    if (!startTime) setStartTime(Date.now());
    if (key === text[currentIndex]) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [text, currentIndex, startTime]);
  
  return { text, currentIndex, handleKeyPress };
};`
  ]
};

export const getRandomText = (difficulty: 'easy' | 'medium' | 'hard' | 'code' = 'medium'): string => {
  const texts = typingTexts[difficulty];
  return texts[Math.floor(Math.random() * texts.length)];
};