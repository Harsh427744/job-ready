import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { questionsAPI } from '../services/api';
import { Question } from '../types';

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState<string>('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const params = difficulty ? { difficulty } : {};
        const response = await questionsAPI.getAll(params);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  const getDifficultyClass = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'badge-easy';
      case 'Medium': return 'badge-medium';
      case 'Hard': return 'badge-hard';
      default: return 'badge-easy';
    }
  };

  const getXP = (diff: string) => {
    switch (diff) {
      case 'Easy': return 10;
      case 'Medium': return 25;
      case 'Hard': return 50;
      default: return 0;
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingBottom: '3rem' }}>
      <div className="container">
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <h1 className="page-title">💡 Coding Questions</h1>
          
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{
              padding: '0.75rem 1.25rem',
              border: '2px solid var(--border)',
              borderRadius: '0.5rem',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '35%' }}>Title</th>
                <th style={{ width: '15%' }}>Difficulty</th>
                <th style={{ width: '10%' }}>XP Reward</th>
                <th style={{ width: '25%' }}>Categories</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question._id}>
                  <td style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {index + 1}
                  </td>
                  <td>
                    <div className="question-title">{question.title}</div>
                  </td>
                  <td>
                    <span className={`badge ${getDifficultyClass(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--warning)',
                        fontWeight: 700,
                        padding: '0.375rem 0.75rem',
                        background: 'rgba(245, 158, 11, 0.1)',
                        borderRadius: '0.375rem',
                        border: '1px solid var(--warning)',
                      }}
                    >
                      +{getXP(question.difficulty)} XP
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {question.category.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="badge badge-category">
                          {cat}
                        </span>
                      ))}
                      {question.category.length > 2 && (
                        <span className="badge badge-category">
                          +{question.category.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link to={`/questions/${question._id}`}>
                      <button 
                        className="btn-primary" 
                        style={{ 
                          padding: '0.5rem 1rem',
                          fontSize: '0.8125rem'
                        }}
                      >
                        Solve →
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {questions.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            color: 'var(--text-secondary)',
            background: 'var(--bg-primary)',
            borderRadius: '1rem',
            marginTop: '2rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: '1.25rem', fontWeight: 500 }}>
              No questions found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
