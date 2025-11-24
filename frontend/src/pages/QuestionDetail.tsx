import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { questionsAPI, submissionsAPI } from '../services/api';
import { Question } from '../types';
import { useTheme } from '../contexts/ThemeContext';

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [question, setQuestion] = useState<Question | null>(null);
  const [code, setCode] = useState('// Write your solution here\n');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const languageDefaults: { [key: string]: string } = {
    javascript: '// Write your solution here\nfunction solution() {\n  // Your code\n}\n',
    python: '# Write your solution here\ndef solution():\n    # Your code\n    pass\n',
    java: '// Write your solution here\nclass Solution {\n    public void solution() {\n        // Your code\n    }\n}\n',
    cpp: '// Write your solution here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code\n    return 0;\n}\n'
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        if (id) {
          const response = await questionsAPI.getById(id);
          setQuestion(response.data);
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  useEffect(() => {
    setCode(languageDefaults[language] || '// Write your solution here\n');
  }, [language]);

  const handleSubmit = async () => {
    if (!id) return;
    
    setSubmitting(true);
    setSubmitMessage('');
    
    try {
      await submissionsAPI.create(id, code, language);
      setSubmitMessage('success');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setSubmitMessage('error');
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'var(--success)';
      case 'Medium': return 'var(--warning)';
      case 'Hard': return 'var(--danger)';
      default: return 'var(--text-secondary)';
    }
  };

  if (loading) {
    return <div className="loading">Loading question...</div>;
  }

  if (!question) {
    return (
      <div className="loading" style={{ color: 'var(--danger)' }}>
        Question not found
      </div>
    );
  }

  return (
    <div className="question-detail">
      {/* Left Panel - Question Description */}
      <div className="question-panel">
        <div style={{ marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate('/questions')}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontWeight: 500,
              marginBottom: '1.5rem'
            }}
          >
            ← Back to Questions
          </button>
          
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
            {question.title}
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span 
              className="badge"
              style={{ 
                background: `${getDifficultyColor(question.difficulty)}22`,
                color: getDifficultyColor(question.difficulty),
                border: `1px solid ${getDifficultyColor(question.difficulty)}`,
                padding: '0.5rem 1rem'
              }}
            >
              {question.difficulty}
            </span>
            {question.category.map((cat, idx) => (
              <span key={idx} className="badge badge-category">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            📝 Description
          </h2>
          <p style={{ 
            lineHeight: '1.75', 
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-wrap'
          }}>
            {question.description}
          </p>
        </div>

        {question.examples && question.examples.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              💡 Examples
            </h2>
            {question.examples.map((example, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--primary)' }}>Input:</strong>{' '}
                  <code style={{ 
                    background: 'var(--bg-tertiary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontFamily: 'monospace'
                  }}>
                    {example.input}
                  </code>
                </div>
                <div style={{ marginBottom: example.explanation ? '0.75rem' : 0 }}>
                  <strong style={{ color: 'var(--success)' }}>Output:</strong>{' '}
                  <code style={{ 
                    background: 'var(--bg-tertiary)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontFamily: 'monospace'
                  }}>
                    {example.output}
                  </code>
                </div>
                {example.explanation && (
                  <div style={{ 
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    fontStyle: 'italic'
                  }}>
                    {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {question.constraints && question.constraints.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              ⚠️ Constraints
            </h2>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {question.constraints.map((constraint, idx) => (
                <li 
                  key={idx}
                  style={{ 
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '0.5rem',
                    borderLeft: '3px solid var(--primary)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Panel - Code Editor */}
      <div className="editor-panel">
        <div className="editor-header">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '0.625rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="submit-btn"
            style={{
              opacity: submitting ? 0.6 : 1
            }}
          >
            {submitting ? '⏳ Submitting...' : '✅ Submit Solution'}
          </button>
        </div>

        {submitMessage && (
          <div style={{
            padding: '1rem 1.5rem',
            background: submitMessage === 'success' 
              ? 'rgba(16, 185, 129, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            borderBottom: `2px solid ${submitMessage === 'success' ? 'var(--success)' : 'var(--danger)'}`,
            color: submitMessage === 'success' ? 'var(--success)' : 'var(--danger)',
            fontWeight: 600
          }}>
            {submitMessage === 'success' 
              ? '✅ Solution submitted successfully! Redirecting to dashboard...' 
              : '❌ Failed to submit solution. Please try again.'}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={isDarkMode ? 'vs-dark' : 'light'}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              padding: { top: 16 },
              lineHeight: 24,
              tabSize: 2,
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
