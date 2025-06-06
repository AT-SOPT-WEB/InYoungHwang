/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

function GitSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });
  const [recentSearchedInput, setRecentSearchedInput] = useState([]);

  const getUserInfo = async (user) => {
    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUserInfo({ status: 'resolved', data });
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSearch = () => {
    if (!searchInput) return;

    getUserInfo(searchInput);

    const updated = [searchInput, ...recentSearchedInput.filter(item => item !== searchInput)];
    setRecentSearches(updated);
    setRecentSearchedInput(updated)
  }

  const handleGoToGithubProfile = () => {
    window.open(userInfo.data.html_url, '_blank');
  }

  const handleClose = () => {
    setUserInfo({ status: 'idle', data: null });
  }

  const getRecentSearches = ()  => {
    const stored = localStorage.getItem('recentGitSearches'); 
    const parsed = stored ? JSON.parse(stored) : [];
    setRecentSearchedInput(parsed);
  };

  const setRecentSearches = (searches) => {
    localStorage.setItem('recentGitSearches', JSON.stringify(searches));
  };

  const handleDeleteSearchInput = (searchInput) => {
    const updated = recentSearchedInput.filter(item => item !== searchInput);
    setRecentSearchedInput(updated);
    setRecentSearches(updated);
  };

  useEffect(()=>{
    getRecentSearches();
  }, [])

  return (
    <div>
        <main css={mainStyle}>
            <InputContainer>
                <input placeholder="아이디로 Github 프로필을 검색해보세요" onChange={(e) => handleSearchInputChange(e)} css={inputStyle} />
                <button onClick={() => handleSearch()} css={buttonStyle}>
                    🔍
                </button>
            </InputContainer>
            <SearchInputContainer>
                {recentSearchedInput.map((item, idx)=>(
                    <span css={searchInputStyle} onClick={() => handleDeleteSearchInput(item)}>
                        <span key={idx}>{item}</span>
                        <span>X</span>
                    </span>
                ))}
            </SearchInputContainer>
            {userInfo.status === 'resolved' && (
            <div css={profileStyle}>
                <CloseButton onClick={()=>handleClose()}>X</CloseButton>
                <img onClick={handleGoToGithubProfile} src={userInfo.data.avatar_url} />
                <p onClick={handleGoToGithubProfile} css={nameStyle}>{userInfo.data.name}</p>
                {userInfo.data.bio?
                    <p>{userInfo.data.bio}</p> :
                    <p>no bio</p>
                }
                <div css={followStyle}>
                    <p>Followers : {userInfo.data.followers}</p>
                    <p>Following : {userInfo.data.following}</p>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}

export default GitSearch;

const mainStyle = css`
    display: flex;
    flex-direction: column;
`
const InputContainer = styled.div`
    display: flex;
`

const inputStyle = css`
    padding: 10px;
    margin-right: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 400px;
    font-size: 0.8rem;
`;

const buttonStyle = css`
    padding: 8px 12px;
    background-color: #333;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const profileStyle = css`
    position: relative;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
    background-color: #d9f9eaa2;
    border-radius: 8px;
    font-weight: 600;

    img {
    width: 160px;
    border-radius: 50%;
    cursor: pointer;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    padding: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1); 
    width: 35px;
    height: 35px; 
`

const nameStyle = css`
    font-size: 1.5rem;
    cursor: pointer;
`

const followStyle = css`
    display: flex;
    gap: 20px;
    font-size: 1.2rem;
`

const SearchInputContainer = styled.div`
    width: 400px;
    display: flex;
    margin: 12px 0px;
    gap: 7px;
    flex-wrap: wrap;
`

const searchInputStyle = css`
    border-radius: 8px;
    width: 100%;
    width: fit-content;
    padding: 4px 6px;
    display: flex;
    gap: 5px;
    cursor: pointer;
    border: 2px solid #55555556;
    background-color: #ececec;
`