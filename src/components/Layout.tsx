import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import './layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="layout-container full-height">
      <aside className="sidebar sidebar-width sidebar-bg text-white padding-6">
        <div className="header flex items-center gap-2 margin-bottom-8">
          <h1 className="title">Student Manager</h1>
        </div>
        
        <nav className="nav-space">
          <button
            onClick={() => navigate('/students')}
            className="nav-btn"
          >
            <GraduationCap className="icon-small" />
            Students
          </button>
          
          <button
            onClick={handleLogout}
            className="nav-btn"
          >
            <LogOut className="icon-small" />
            Logout
          </button>
        </nav>
      </aside>
      
      <main className="main-content overflow-auto bg-light">
        <div className="padding-8">
          {children}
        </div>
      </main>
    </div>
  );
}
