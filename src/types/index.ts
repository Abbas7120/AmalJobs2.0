export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: 'Tech' | 'Government' | 'Non-Tech' | 'Internship';
  type: string;
  description: string;
  application_link: string;
  deadline: string;
  posted_date: string;
  status: 'active' | 'expired';
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface ShareData {
  title: string;
  company: string;
  deadline: string;
  url: string;
}