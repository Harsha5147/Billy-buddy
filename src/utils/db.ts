import { openDB } from 'idb';

const DB_NAME = 'BillyDB';
const DB_VERSION = 1;

interface User {
  id?: number;
  username: string;
  password: string;
  fullName: string;
  userType: 'admin' | 'user';
  createdAt: string;
}

interface Report {
  id?: number;
  userId: number;
  incidentType: string;
  description: string;
  evidence: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  createdAt: string;
  reporterName: string;
}

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create users store
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        userStore.createIndex('username', 'username', { unique: true });
        
        // Create default admin user
        userStore.put({
          username: 'admin',
          password: 'Admin@123', // Secure admin password
          fullName: 'System Administrator',
          userType: 'admin',
          createdAt: new Date().toISOString()
        });
      }

      // Create reports store
      if (!db.objectStoreNames.contains('reports')) {
        const reportStore = db.createObjectStore('reports', { keyPath: 'id', autoIncrement: true });
        reportStore.createIndex('userId', 'userId');
        reportStore.createIndex('status', 'status');
        reportStore.createIndex('date', 'date');
      }
    }
  });
  return db;
};

// User operations
export const getUser = async (username: string): Promise<User | undefined> => {
  const db = await initDB();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const index = store.index('username');
  return index.get(username);
};

export const addUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<number> => {
  const db = await initDB();
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  const id = await store.add({
    ...user,
    createdAt: new Date().toISOString()
  });
  await tx.done;
  return id;
};

// Report operations
export const addReport = async (report: Omit<Report, 'id' | 'createdAt'>): Promise<number> => {
  const db = await initDB();
  const tx = db.transaction('reports', 'readwrite');
  const store = tx.objectStore('reports');
  const id = await store.add({
    ...report,
    createdAt: new Date().toISOString()
  });
  await tx.done;
  return id;
};

export const getAllReports = async (): Promise<Report[]> => {
  const db = await initDB();
  const tx = db.transaction('reports', 'readonly');
  const store = tx.objectStore('reports');
  return store.getAll();
};

export const getReports = async (userId: number): Promise<Report[]> => {
  const db = await initDB();
  const tx = db.transaction('reports', 'readonly');
  const store = tx.objectStore('reports');
  const index = store.index('userId');
  return index.getAll(userId);
};

export const updateReportStatus = async (id: number, status: Report['status']): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction('reports', 'readwrite');
  const store = tx.objectStore('reports');
  const report = await store.get(id);
  if (report) {
    report.status = status;
    await store.put(report);
  }
  await tx.done;
};

export type { User, Report };