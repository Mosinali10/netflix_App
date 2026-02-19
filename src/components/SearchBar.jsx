import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ setSearchTerm }) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(input);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [input, setSearchTerm]);

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search for movies, actors, or genres..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="search-input"
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .search-container {
          display: flex;
          justify-content: center;
          padding: 1rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        .search-wrapper {
          position: relative;
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 0.8rem 1.5rem;
          display: flex;
          align-items: center;
          transition: var(--transition);
        }
        .search-wrapper:focus-within {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--primary-color);
          box-shadow: 0 0 15px rgba(229, 9, 20, 0.3);
        }
        .search-icon {
          color: var(--text-muted);
          margin-right: 1rem;
        }
        .search-input {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          width: 100%;
          outline: none;
        }
        .search-input::placeholder {
          color: #666;
        }
      `}} />
        </div>
    );
};

export default SearchBar;
