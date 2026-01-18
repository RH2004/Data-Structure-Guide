import React from 'react';
import {
    FileText, List, Layers, ArrowRightLeft, GitBranch,
    Binary, Hash, HardDrive, Share2, AlertCircle,
    Terminal, Database, Cpu, Activity, Zap, Shield,
    Repeat, User, Globe, Trophy, GitMerge, Search,
    ArrowDownCircle, Network
} from 'lucide-react';

export interface SlideData {
    number: number;
    color: 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'brown';
    title: string;
    name: string;
    content: React.ReactNode;
    visual?: React.ReactNode;
}

export interface DeckData {
    id: string;
    title: string;
    slides: SlideData[];
}

export const SLIDE_DECKS: DeckData[] = [
    {
        id: 'file-handling',
        title: 'File Handling',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Data Engineer',
                name: 'Professional Problematics',
                content: <p>You are processing gigabytes of user logs to detect security threats. Every time you try to process the day{"'"}s data, your server crashes with an "Out of Memory" error. The logs are too big to "just open."</p>,
                visual: <FileText size={120} strokeWidth={1.5} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p><code>data = open("big_file.log").read()</code> attempts to load 10GB of text into 8GB of RAM. The OS kills the process. Even if it fits, searching through one giant string is incredibly slow and inefficient.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p>Instead of drinking the whole ocean, use a straw. Process data <strong>line by line</strong> or <strong>chunk by chunk</strong>. The organizing principle is <em>Streaming</em>: only keep what you are currently looking at in memory.</p>,
                visual: <Zap size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A File Handle is a special object that acts as a <em>pointer</em> to a specific location on your disk. It doesn{"'"}t contain the data; it provides a way to request it piece by piece.</p>,
                visual: <div className="structural-diagram">DISK [===|====] {"->"} POINTER</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p>It tracks a "Cursor." When you read 100 bytes, the cursor moves forward. You can move back (Seek) or append to the end. It{"'"}s strictly sequential by default.</p>,
                visual: <Terminal size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List / Dict?',
                name: 'Why Not Just Use X?',
                content: (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Feature</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>List (RAM)</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>File (Disk)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px' }}>Persistence</td>
                                <td style={{ padding: '8px' }}>Gone on exit</td>
                                <td style={{ padding: '8px' }}>Permanent</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}>Speed</td>
                                <td style={{ padding: '8px' }}>Nanoseconds</td>
                                <td style={{ padding: '8px' }}>Milliseconds</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}>Scale</td>
                                <td style={{ padding: '8px' }}>Bounded by RAM</td>
                                <td style={{ padding: '8px' }}>Huge (Disk)</td>
                            </tr>
                        </tbody>
                    </table>
                )
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>Latency: Reading from disk is ~100,000x slower than RAM. Concurrent Access: Multiple programs writing to one file causes "Race Conditions" and corruption.</p>,
                visual: <Shield size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`# Stream a 10GB file without crashing
with open("huge.log", "r") as f:
    for line in f:
        if "ERROR" in line:
            print(line.strip())`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Databases:</strong> They are just complex file managers. <strong>Networking:</strong> Sockets behave exactly like file streams. <strong>OS:</strong> "Everything is a file" in Unix.</p>,
                visual: <Database size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A file handle is a straw, not a bucket: it lets you sip from a data ocean without drowning your system."</h3>
            }
        ]
    },
    {
        id: 'arrays',
        title: 'Arrays (Conceptual)',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Systems Engineer',
                name: 'Professional Problematics',
                content: <p>You{"'"}re building a stock ticker that needs to process 10,000 prices per second. Any delay in accessing a price causes financial loss. Your data is scattered in memory, and looking it up feels sluggish.</p>,
                visual: <Activity size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Standard Python lists are "dynamic." They store extra info and can be scattered across memory. Following these pointers takes time. For high-speed systems, this "overhead" is a killer.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p>Contiguous Memory. Pack items side-by-side like eggs in a carton. If you know where the first one is, you can calculate the location of <em>any</em> item instantly using simple math.</p>,
                visual: <Layers size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>An Array is a fixed-size sequence of elements of the same type, stored in a single, unbroken block of memory. It is the most fundamental way to organize data for speed.</p>,
                visual: <div className="structural-diagram">[ 10 | 20 | 30 | 40 ]</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Random Access:</strong> Read any index in O(1) time. <strong>Static size:</strong> Once created, it cannot grow. To add more, you must build a new, bigger carton and move all the eggs.</p>,
                visual: <ArrowRightLeft size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Feature</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Python List</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Static Array</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px' }}>Types</td>
                                <td style={{ padding: '8px' }}>Mixed (Any)</td>
                                <td style={{ padding: '8px' }}>Strict (Same)</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}>Size</td>
                                <td style={{ padding: '8px' }}>Grows/Shrinks</td>
                                <td style={{ padding: '8px' }}>Fixed Forever</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}>Efficiency</td>
                                <td style={{ padding: '8px' }}>Heavier RAM</td>
                                <td style={{ padding: '8px' }}>Lean & Fast</td>
                            </tr>
                        </tbody>
                    </table>
                )
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p><strong>Insertions:</strong> Adding to the middle is O(n) because you have to slide every subsequent item over. <strong>Wasted Space:</strong> If you allocate space for 1000 but only use 10, the rest is "dead" RAM.</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`import array
# Type 'i' = signed integers
arr = array.array('i', [1, 2, 3])
print(arr[1]) # Instant access
arr.append(4) # Painful resize!`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Images:</strong> Every JPEG is just a 2D or 3D array of pixel values. <strong>AI/ML:</strong> Tensors and Matrices in NumPy/PyTorch are essentially giant optimized arrays.</p>,
                visual: <Cpu size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"An array is a set of lockers: if you know the first locker{"'"}s number, you can find the 100th one without walking past the others."</h3>
            }
        ]
    },
    {
        id: 'linked-lists',
        title: 'Linked Lists',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Backend Engineer',
                name: 'Professional Problematics',
                content: <p>You{"'"}re building a real-time feed of tasks. New tasks arrive constantly and must be inserted at the very beginning. As the list grows to millions of items, your API becomes sluggish and eventually timed out.</p>,
                visual: <Share2 size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>In an Array (Python List), inserting at the start requires shifting every other item in memory. It{"'"}s O(n). For 1 million items, that{"'"}s 1 million "moves" for every single arrival. The CPU can{"'"}t keep up.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p>Don{"'"}t move the data. Just change the "next" pointer. Like a relay race, each runner only needs to know who to hand the baton to next. Location in memory doesn{"'"}t matter anymore.</p>,
                visual: <ArrowRightLeft size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Linked List is a series of "Nodes." Each node contains your data AND a pointer to the next node. They can be scattered anywhere in RAM, but they are logically connected in a chain.</p>,
                visual: <div className="structural-diagram">[Data|*] {"->"} [Data|*] {"->"} [Data|NULL]</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Head:</strong> The start of the chain. <strong>Tail:</strong> The end. To find the 5th item, you MUST start at the head and walk through 1, 2, 3, and 4. No skipping allowed!</p>,
                visual: <Activity size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Operation</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Array / List</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Linked List</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '8px' }}>Insert at Start</td>
                                <td style={{ padding: '8px' }}>Slow O(n)</td>
                                <td style={{ padding: '8px' }}>Fast O(1)</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '8px' }}>Random Access</td>
                                <td style={{ padding: '8px' }}>Fast O(1)</td>
                                <td style={{ padding: '8px' }}>Slow O(n)</td>
                            </tr>
                        </tbody>
                    </table>
                )
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>If you need to frequently jump to random items (e.g., "Give me item #500"). Also, they use more memory because you have to store all those "next" arrows alongside your data.</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

node1 = Node("A")
node2 = Node("B")
node1.next = node2`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Browser History:</strong> Back/Forward buttons. <strong>LRU Caches:</strong> deciding what to delete when memory is full. <strong>Music Playlists:</strong> Next/Previous functionality.</p>,
                visual: <Repeat size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A linked list is a scavenger hunt: you don{"'"}t know where the treasure is, only where the next clue leads."</h3>
            }
        ]
    },
    {
        id: 'stacks',
        title: 'Stacks',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as an AI / ML Engineer',
                name: 'Professional Problematics',
                content: <p>You are building a complex Undo/Redo system for a high-end design tool. You need to revert the absolute latest change perfectly, but your history log of millions of actions is becoming a tangled mess to search.</p>,
                visual: <Repeat size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Using a standard list with random access is dangerous. If you accidentally delete an action from the middle of history, the entire state becomes corrupted. You need a strict "Last-In, First-Out" protocol.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>LIFO:</strong> Last-In, First-Out. Like a stack of cafeteria plates, you can{"'"}t grab the bottom plate without potentially breaking everything. You deal with the top, and only the top.</p>,
                visual: <Layers size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Stack is a restricted linear data structure. It only allows adding and removing elements from one end, called the "top." It{"'"}s the ultimate tool for reversing processes.</p>,
                visual: <div className="structural-diagram">[TOP] {"->"} [D] {"->"} [C] {"->"} [B] {"->"} [A]</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Push:</strong> Add to the top. <strong>Pop:</strong> Remove from the top. <strong>Peek:</strong> Look at the top without removing it. It{"'"}s simple, fast, and very predictable.</p>,
                visual: <Activity size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: <p>A List is a Swiss Army Knife; a Stack is a Scalpel. Lists allow indexed access (<code>list[5]</code>), which makes it easy to bypass the LIFO rule and introduce bugs into "Undo" logic.</p>,
                visual: <Shield size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>If you need to search for an item in the middle. To find the bottom plate, you have to remove (and potentially lose) every plate above it. It{"'"}s O(n) for search, and destructive.</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`history = []
history.append("Action 1") # Push
history.append("Action 2")
last_action = history.pop() # Pop
# Result: "Action 2"`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>The Call Stack:</strong> How your computer remembers where to go back to after a function finishes. <strong>Parsing:</strong> Checking if parentheses <code>(( ))</code> are balanced.</p>,
                visual: <Database size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A stack is a Pringles can: you have to eat the top chip to get to the one below."</h3>
            }
        ]
    },
    {
        id: 'queues',
        title: 'Queues',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Systems Engineer',
                name: 'Professional Problematics',
                content: <p>Your printer server is receiving requests from 500 employees simultaneously. If the CEO's document (sent first) prints after the intern's (sent last), you'll have an office riot. You need guaranteed fairness.</p>,
                visual: <ArrowRightLeft size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>A Stack would be unfair (Last-In-First-Out). A random List would be chaos. Using <code>list.pop(0)</code> in Python is a hidden performance trap—it{"'"}s O(n) because it has to shift EVERY remaining item.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>FIFO:</strong> First-In, First-Out. Like a line at a supermarket, the person who arrived first is served first. This ensures <em> fairness</em> and <em>predictable order</em>.</p>,
                visual: <Activity size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Queue is a linear data structure with two ends: an "Entrance" (Rear) and an "Exit" (Front). You enter at the back and leave from the front. No cutting in line!</p>,
                visual: <div className="structural-diagram">IN {"->"} [D] [C] [B] [A] {"->"} OUT</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Enqueue:</strong> Join the back of the line. <strong>Dequeue:</strong> Leave from the front. It maintains chronological order regardless of how many items are added.</p>,
                visual: <ArrowRightLeft size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: <p>Performance. <code>list.pop(0)</code> is O(n). If your queue has 1 million items, every "next customer" forces the computer to move 999,999 items forward in memory. A true Queue (Deque) does this in O(1).</p>,
                visual: <Zap size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>If the producer is faster than the consumer (Producer-Consumer mismatch), the queue grows infinitely (Memory Leak). Also, it provides no way to handle high-priority "emergency" items.</p>,
                visual: <Shield size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`from collections import deque
q = deque()
q.append("A") # Enqueue
q.append("B")
first = q.popleft() # Dequeue
# Result: "A"`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Task Scheduling:</strong> How your CPU decides which app to run next. <strong>BFS Algorithm:</strong> Searching a network level-by-level. <strong>Load Balancers:</strong> Distributing web traffic.</p>,
                visual: <Layers size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A queue is what you use when fairness and order matter more than speed."</h3>
            }
        ]
    },
    {
        id: 'trees',
        title: 'Trees',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Cybersecurity Analyst',
                name: 'Professional Problematics',
                content: <p>You are mapping a corporate network to find vulnerabilities. Your simple list of connections is a mess of Parent/Child relationships. You can{"'"}t easily find who "owns" which server or where the data flows.</p>,
                visual: <GitBranch size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Nested lists or flat arrays are like trying to read a 1000-page book where every page points to 5 other pages randomly. It{"'"}s impossible to manage the "Hierarchy" without a clear organizing principle.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>Hierarchy:</strong> One root, many branches. Like an organization chart, every node has exactly one "boss" (Parent) but can have many "subordinates" (Children).</p>,
                visual: <GitMerge size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Tree is a non-linear data structure that represents a hierarchical relationship. It starts at a single "Root" node and branches out into "Leaves."</p>,
                visual: <div className="structural-diagram">ROOT {"->"} [CH1] [CH2]</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Depth:</strong> How far a node is from the root. <strong>Traversal:</strong> Moving through the tree (e.g., from top to bottom) to visit every node exactly once.</p>,
                visual: <ArrowDownCircle size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: <p>Lists are flat; life is branched. Trees allow you to represent natural hierarchies like file systems, HTML DOM, or your own computer{"'"}s directory structure.</p>,
                visual: <Layers size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>If your tree becomes "skewed" (everyone has only one child), it becomes a slow Linked List. Also, if nodes have multiple parents, it{"'"}s not a tree anymore—it{"'"}s a Graph.</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`class Node:
    def __init__(self, val):
        self.val = val
        self.children = []

root = Node("Boss")
root.children.append(Node("Emp A"))`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>File Systems:</strong> Folders and files. <strong>Web Dev:</strong> The DOM tree in your browser. <strong>AI:</strong> Decision Trees used to predict behavior.</p>,
                visual: <Globe size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A tree is a family tree: everyone has one biological parent, but can have many children."</h3>
            }
        ]
    },
    {
        id: 'bst',
        title: 'Binary Search Trees (BST)',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Software Engineer',
                name: 'Professional Problematics',
                content: <p>You need to search through 1 billion user accounts in real-time. A simple search (checking one by one) takes 1 billion checks. Your server's CPU is melting under the load.</p>,
                visual: <Search size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Linear search is like reading every name in a massive phonebook to find "Zoe". Even if you search 1 million names per second, it takes 15 minutes to find the last one. Users won't wait.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>Elimination:</strong> Smaller to the left, larger to the right. Every single comparison you make ELIMINATES half of the remaining data. It's the ultimate "Divide and Conquer."</p>,
                visual: <Binary size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A BST is a binary tree where for every node: all values in the left subtree are smaller, and all values in the right subtree are larger than the node's value.</p>,
                visual: <div className="structural-diagram">50 {"->"} [25] [75]</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Search:</strong> O(log n). If the value is smaller than current, go left. If larger, go right. Searching 1 billion items takes only ~30 checks!</p>,
                visual: <ArrowDownCircle size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a Hash Table?',
                name: 'Why Not Just Use X?',
                content: <p>Hash Tables are "orderless." BSTs keep your data <em>sorted</em> at all times. If you need to find the "next" item or a range (e.g., users aged 20-30), BSTs are superior.</p>,
                visual: <List size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>If you insert data in sorted order (1, 2, 3, 4...), the tree becomes a single long chain. It loses its speed and becomes a slow Linked List (O(n)).</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`def search(root, key):
    if root is None or root.val == key:
        return root
    if root.val < key:
        return search(root.right, key)
    return search(root.left, key)`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Databases:</strong> B-Trees (a variant) are how SQL indexes work. <strong>File Compression:</strong> Morse code and Huffman coding use tree structures.</p>,
                visual: <Database size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A BST is the 'Higher or Lower' game: every guess cuts the search area in half."</h3>
            }
        ]
    },
    {
        id: 'hash-tables',
        title: 'Hash Tables',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Backend Engineer',
                name: 'Professional Problematics',
                content: <p>You are building a translation app. Searching a list of 100,000 words for every single word in a sentence is making the app feel dead. You need a way to find a word <em>instantly</em>.</p>,
                visual: <Hash size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Even Binary Search (O(log n)) is too slow for some systems. Comparison search (comparing letters) takes time. You want "Instant" lookup that doesn't care how much data you have.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>Key Mapping:</strong> Don't search for the bucket. Use the data's name to compute the <em>exact address</em> of the bucket. It's like having a GPS for every single piece of data.</p>,
                visual: <Zap size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Hash Table maps keys to values. It uses a <strong>Hash Function</strong> to turn a key (like "Apple") into a number (index) in an underlying array.</p>,
                visual: <div className="structural-diagram">"KEY" {"->"} [HASH Func] {"->"} INDEX</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>O(1) Average:</strong> Lookup, insertion, and deletion are nearly instant. <strong>Collisions:</strong> When two different keys hash to the same index, they must be "chained" together.</p>,
                visual: <GitMerge size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: <p>Lists are for <em>order</em>; Hash Tables are for <em>identity</em>. In a list, you search by index (location); in a hash table, you search by the thing itself (name/key).</p>,
                visual: <User size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p><strong>Memory:</strong> They use a lot of RAM to keep the table sparse. <strong>No Order:</strong> You can't easily say "get me the next item" because they are scattered randomly.</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`# Python's built-in Hash Table
prices = {"apple": 0.5, "banana": 0.3}
# Instant lookup
print(prices["apple"])`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Caching:</strong> Redis and Memcached are giant hash tables. <strong>Compilers:</strong> Tracking variable names. <strong>Deduplication:</strong> Finding duplicate files.</p>,
                visual: <Activity size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A hash table is a valet parking system: you give a ticket (key) and get your car (value) immediately."</h3>
            }
        ]
    },
    {
        id: 'heaps',
        title: 'Heaps',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Systems Engineer',
                name: 'Professional Problematics',
                content: <p>You are building an emergency room triage system. Patients arrive in random order, but the person with a critical emergency MUST be seen before someone with a minor injury.</p>,
                visual: <Activity size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Sorting a list every time a new patient arrives is too slow (O(n log n)). Searching a list for the "most important" item is O(n). You need a way to keep the most important item at the top <em>cheaply</em>.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>Semi-Order:</strong> We don{"'"}t care if the 5th most important person is before the 6th, as long as the 1st most important person is ALWAYS at the very top of the pile.</p>,
                visual: <Trophy size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Heap is a specialized tree where every parent is "better" (larger or smaller) than its children. It guarantees the absolute "best" item is always the root.</p>,
                visual: <div className="structural-diagram">[99] {"->"} [50] [40]</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Extract:</strong> Take the top item and let the next best "bubble up." <strong>Bubble Up:</strong> When a new items arrives, it moves up the tree until it finds its rightful place.</p>,
                visual: <ArrowDownCircle size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a List?',
                name: 'Why Not Just Use X?',
                content: <p>Finding the max in a list is O(n). Heaps give it to you in O(1). Maintaining the order in a list is expensive; Heaps maintain it in O(log n) with minimal swapping.</p>,
                visual: <Layers size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p>Searching for anything <em>except</em> the top item. If you need to find the 10th most important item or a specific value, a heap is no better than a messy list (O(n)).</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`import heapq
h = []
heapq.heappush(h, 10) # Priority 10
heapq.heappush(h, 1)  # Priority 1
best = heapq.heappop(h) # Returns 1`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>Operating Systems:</strong> Choosing which process to run. <strong>Games:</strong> Pathfinding (A* algorithm). <strong>Sorting:</strong> HeapSort is a classic algorithm.</p>,
                visual: <Cpu size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A heap is a podium: only the gold medalist matters, and they are always standing at the top."</h3>
            }
        ]
    },
    {
        id: 'graphs',
        title: 'Graphs',
        slides: [
            {
                number: 1,
                color: 'green',
                title: 'A Problem You Will Face as a Data Engineer',
                name: 'Professional Problematics',
                content: <p>You are building a friend-recommendation engine. How do you find "friends of friends" when everyone is connected to everyone else in a chaotic, tangled web?</p>,
                visual: <Network size={120} />
            },
            {
                number: 2,
                color: 'blue',
                title: 'Why the Obvious Approach Breaks',
                name: 'Why Naive Solutions Fail',
                content: <p>Lists and Trees fail because people have multiple "parents" (friends) and connections can circle back (Cycles). A tree would force you to choose one boss; reality doesn't work that way.</p>,
                visual: <AlertCircle size={100} color="red" />
            },
            {
                number: 3,
                color: 'yellow',
                title: 'The Core Idea That Fixes This',
                name: 'The Core Idea',
                content: <p><strong>Relationships:</strong> Nodes (People) and Edges (Friendships). It's a web where any node can talk to any other node. Connections are the first-class citizens.</p>,
                visual: <Share2 size={100} />
            },
            {
                number: 4,
                color: 'green',
                title: 'What This Data Structure Is',
                name: 'Clear Definition',
                content: <p>A Graph is a collection of <strong>Vertices</strong> and <strong>Edges</strong>. They represent complex, non-linear networks where cycles and multiple paths are allowed.</p>,
                visual: <div className="structural-diagram">(A) {"<->"} (B) {"<->"} (C) {"\n"} ^ --- --- ^</div>
            },
            {
                number: 5,
                color: 'blue',
                title: 'How It Thinks',
                name: 'How It Behaves',
                content: <p><strong>Directed:</strong> Like Twitter (Followers). <strong>Undirected:</strong> Like Facebook (Friends). <strong>Weighted:</strong> Like Google Maps (The "Edge" has a cost/distance).</p>,
                visual: <ArrowRightLeft size={100} />
            },
            {
                number: 6,
                color: 'red',
                title: 'Why Not Just Use a Tree?',
                name: 'Why Not Just Use X?',
                content: <p>Trees are restricted; Graphs are free. Trees cannot have cycles or multiple paths to the same destination. Graphs are the only way to model the real world (Power grids, Internet, Social media).</p>,
                visual: <Globe size={100} />
            },
            {
                number: 7,
                color: 'red',
                title: 'When This Will Hurt You',
                name: 'When This Is a Bad Idea',
                content: <p><strong>State Explosion:</strong> Exploring every path can take exponential time. Algorithms like BFS/DFS are necessary to avoid getting lost in the "Social Maze."</p>,
                visual: <Zap size={100} color="red" />
            },
            {
                number: 8,
                color: 'purple',
                title: 'Minimal Python Example',
                name: 'Minimal Python Example',
                content: (
                    <pre className="code-block">
                        {`# "Adjacency List" representation
graph = {
    "You": ["Alice", "Bob"],
    "Alice": ["Charlie"],
    "Bob": ["Alice"]
}`}
                    </pre>
                )
            },
            {
                number: 9,
                color: 'brown',
                title: 'Where This Comes Back',
                name: 'Where You\'ll Meet This Again',
                content: <p><strong>GPS / Maps:</strong> Finding the shortest path. <strong>The Internet:</strong> How packets find their way. <strong>Medicine:</strong> Mapping neural pathways in the brain.</p>,
                visual: <Activity size={100} />
            },
            {
                number: 10,
                color: 'yellow',
                title: 'Remember It Like This',
                name: 'One-Sentence Mental Model',
                content: <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>"A graph is a subway system: stations are nodes, tracks are edges, and everything is connected."</h3>
            }
        ]
    }
];
