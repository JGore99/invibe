import React, { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import "./App.css"
import BarDetails from '../BarDetails/BarDetails'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import Users from '../Users/Users'
import Profile from '../Profile/Profile'
import Footer from '../../components/Footer/Footer'
import SearchLocations from '../SearchLocations/SearchLocations'
import { getLocation } from "../../services/locationService"
import * as authService from '../../services/authService'

const App = () => {
	const [user, setUser] = useState(authService.getUser())
	const navigate = useNavigate()
	const [locationResults, setlocationResults] = useState([])
	const [searchLocation, setSearchLocation] = useState([])


	const handleLogout = () => {
		authService.logout()
		setUser(null)
		navigate('/')
	}

	const handleSignupOrLogin = () => {
		setUser(authService.getUser())
	}

	const handleSearch = (locationData) => {
			getLocation(locationData.location)
			.then(locationResults=> {
				setSearchLocation(locationData.location)
				setlocationResults(locationResults.businesses)
			})
		}

		const resetSearch = () => {
			setSearchLocation([])
			setlocationResults([])
			navigate('/search')
		}

// all functions to change a profile live in App

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout} resetSearch={resetSearch}/>
			<Routes>
				<Route path='/' element={<Landing user={user} />} />
				<Route path='/signup' element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />
				<Route path='/login' element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
				<Route path='/users' element={user ? <Users /> : <Navigate to='/login' />} />
				<Route path="/search" element={user ? <SearchLocations handleSearch={handleSearch} locationResults={locationResults} searchLocation={searchLocation} resetSearch={resetSearch} user={user} /> : <Navigate to='/login' />} />
				<Route path='/users' element={user ? <Users /> : <Navigate to='/login' user={user} />} />
				<Route path="/barDetails" element={<BarDetails />}></Route>
				<Route path="/profile/:id" element={<Profile user={user} />}></Route>
			</Routes>
			<Footer />
		</>
	);
}
 
export default App;