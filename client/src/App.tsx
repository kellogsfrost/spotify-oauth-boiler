import React, {useState, useEffect} from 'react';
import './App.css';
import openNewAuthWindow from './openWindow'
import axios from 'axios'

// We had to define this because TS needs to know
// the shape of our user object

export interface IUser {
  _id?: string;
  spotifyId: string;

}

export interface IRepo {
  name: string
}

// A functional component must be of type React.FC (Functional component)
const App: React.FC = () => {
  // useState can be used as a generic
  const [user, setUser] = useState<IUser>({} as IUser)
  const [repos, setRepos] = useState<IRepo[]>([])

  useEffect( () => {
    console.log('firing data fetch')
    if (Object.keys(user).length) {
      axios.get(`/api/${user.spotifyId}/repos`)
      .then((res) => {
        setRepos(res.data)
      })
    }
  }, [user])

  function handleLogin(e: React.MouseEvent): void {
    e.preventDefault()
    var message: Promise<IUser> = openNewAuthWindow('/auth/spotify')
    message.then(res => {
      setUser(res)
    }).catch(err => {
      console.log(err)
    })
  }

  var userData = Object.keys(user).length === 0 ? <p>No user</p> : <p>{user.spotifyId}</p>
  var repoData = repos.map((repo, id) => {
    return <p>{repo.name}</p>
  })

  return (
    <div className="App">
      <a onClick={handleLogin} href="/auth/spotify">Login to Spotify</a>
      {userData}
      {repoData}
    </div>
  );
}

export default App;
