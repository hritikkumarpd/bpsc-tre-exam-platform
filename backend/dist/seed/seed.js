"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const user_model_1 = require("../models/user.model");
const subject_model_1 = require("../models/subject.model");
const topic_model_1 = require("../models/topic.model");
const question_model_1 = require("../models/question.model");
const question_fingerprint_model_1 = require("../models/question-fingerprint.model");
const fingerprint_service_1 = require("../services/fingerprint.service");
const seed = async () => {
    console.log('🌱 Starting Database Seeding...');
    await (0, database_1.connectDatabase)();
    // Clear existing collections in development seed
    await user_model_1.UserModel.deleteMany({});
    await subject_model_1.SubjectModel.deleteMany({});
    await topic_model_1.TopicModel.deleteMany({});
    await question_model_1.QuestionModel.deleteMany({});
    await question_fingerprint_model_1.QuestionFingerprintModel.deleteMany({});
    console.log('🧹 Cleared existing seed collections.');
    // Create Users
    const adminPassword = await bcryptjs_1.default.hash('Admin@123456', 10);
    const studentPassword = await bcryptjs_1.default.hash('Student@123456', 10);
    const admin = await user_model_1.UserModel.create({
        name: 'Platform Super Admin',
        email: 'admin@examprepcs.in',
        passwordHash: adminPassword,
        role: 'SUPER_ADMIN',
        targetExam: 'BOTH',
    });
    const student = await user_model_1.UserModel.create({
        name: 'Sample Aspirant',
        email: 'student@examprepcs.in',
        passwordHash: studentPassword,
        role: 'STUDENT',
        targetExam: 'BPSC_TRE_CSE',
    });
    console.log(`👤 Created Users: Super Admin (${admin.email}), Student (${student.email})`);
    // Create Subjects & Topics
    const subjectsData = [
        {
            name: 'Data Structures & Algorithms',
            code: 'DSA',
            topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Sorting & Searching'],
        },
        {
            name: 'Operating Systems',
            code: 'OS',
            topics: ['Process Management', 'CPU Scheduling', 'Deadlocks', 'Memory Management & Paging'],
        },
        {
            name: 'Database Management Systems',
            code: 'DBMS',
            topics: ['ER Diagrams', 'Relational Algebra', 'SQL Queries & Joins', 'Normalization (1NF-BCNF)', 'ACID Transactions'],
        },
        {
            name: 'Computer Networks',
            code: 'CN',
            topics: ['OSI & TCP/IP Reference Models', 'IP Addressing & Subnetting', 'Routing Protocols', 'HTTP/HTTPS & Security'],
        },
        {
            name: 'Object Oriented Programming',
            code: 'OOP',
            topics: ['Classes & Objects', 'Inheritance & Polymorphism', 'Constructors & Destructors', 'Encapsulation & Abstraction'],
        },
    ];
    for (const sData of subjectsData) {
        const subject = await subject_model_1.SubjectModel.create({
            name: sData.name,
            code: sData.code,
            examCategory: 'BOTH',
        });
        for (const tName of sData.topics) {
            await topic_model_1.TopicModel.create({
                name: tName,
                code: `${sData.code}_${tName.toUpperCase().replace(/[^A-Z]/g, '')}`,
                subjectId: subject._id,
            });
        }
    }
    console.log('📚 Created Subjects and Topics.');
    // Create Sample Verified Questions (Strictly HUMAN_CREATED / AI_INSPIRED, NOT fake PYQs)
    const sampleQuestions = [
        {
            questionText: 'Which data structure is primarily used to implement Breadth-First Search (BFS) in a graph?',
            options: [
                { key: 'A', text: 'Stack' },
                { key: 'B', text: 'Queue' },
                { key: 'C', text: 'Priority Queue' },
                { key: 'D', text: 'Binary Tree' },
                { key: 'E', text: 'None of the above' },
            ],
            correctAnswer: 'B',
            explanation: 'Breadth-First Search explores graph nodes level-by-level using a FIFO Queue data structure.',
            exam: 'BPSC_TRE_CSE',
            subject: 'Data Structures & Algorithms',
            topic: 'Trees & BST',
            difficulty: 'EASY',
            sourceType: 'HUMAN_CREATED',
            sourceReference: 'Standard CS Reference Curriculum',
        },
        {
            questionText: 'What is the time complexity of searching for an element in a Balanced Binary Search Tree (AVL Tree)?',
            options: [
                { key: 'A', text: 'O(1)' },
                { key: 'B', text: 'O(n)' },
                { key: 'C', text: 'O(log n)' },
                { key: 'D', text: 'O(n log n)' },
                { key: 'E', text: 'None of the above' },
            ],
            correctAnswer: 'C',
            explanation: 'In a balanced BST like an AVL tree, height is maintained at O(log n), guaranteeing logarithmic search time.',
            exam: 'STET_CSE',
            subject: 'Data Structures & Algorithms',
            topic: 'Trees & BST',
            difficulty: 'MEDIUM',
            sourceType: 'HUMAN_CREATED',
            sourceReference: 'Standard CS Reference Curriculum',
        },
        {
            questionText: 'In Operating Systems, which condition is NOT required for a deadlock to occur according to Coffman conditions?',
            options: [
                { key: 'A', text: 'Mutual Exclusion' },
                { key: 'B', text: 'Hold and Wait' },
                { key: 'C', text: 'Preemption Allowed' },
                { key: 'D', text: 'Circular Wait' },
                { key: 'E', text: 'None of the above' },
            ],
            correctAnswer: 'C',
            explanation: 'No preemption (preemption NOT allowed) is required for deadlock. If preemption is allowed, deadlock cannot occur.',
            exam: 'BPSC_TRE_CSE',
            subject: 'Operating Systems',
            topic: 'Deadlocks',
            difficulty: 'HARD',
            sourceType: 'HUMAN_CREATED',
            sourceReference: 'Standard OS Textbook',
        },
        {
            questionText: 'Which Normal Form guarantees that every non-trivial functional dependency X -> Y has X as a Super Key?',
            options: [
                { key: 'A', text: '1NF' },
                { key: 'B', text: '2NF' },
                { key: 'C', text: '3NF' },
                { key: 'D', text: 'BCNF (Boyce-Codd Normal Form)' },
                { key: 'E', text: 'None of the above' },
            ],
            correctAnswer: 'D',
            explanation: 'Boyce-Codd Normal Form (BCNF) strictly requires that for every non-trivial functional dependency X -> Y, X must be a super key.',
            exam: 'BPSC_TRE_CSE',
            subject: 'Database Management Systems',
            topic: 'Normalization (1NF-BCNF)',
            difficulty: 'HARD',
            sourceType: 'HUMAN_CREATED',
            sourceReference: 'Standard DBMS Textbook',
        },
    ];
    for (const q of sampleQuestions) {
        const { hash, normalized } = (0, fingerprint_service_1.generateFingerprintHash)(q.questionText);
        const question = await question_model_1.QuestionModel.create({
            ...q,
            verificationStatus: 'VERIFIED',
            fingerprint: hash,
            createdBy: admin._id,
            verifiedBy: admin._id,
        });
        await question_fingerprint_model_1.QuestionFingerprintModel.create({
            fingerprintHash: hash,
            normalizedText: normalized,
            questionId: question._id,
        });
    }
    console.log(`❓ Created ${sampleQuestions.length} Verified Questions with Fingerprints.`);
    console.log('✅ Seeding Completed Successfully!');
    await (0, database_1.closeDatabase)();
};
if (require.main === module) {
    seed().catch((err) => {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    });
}
