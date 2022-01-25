import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import CocktailForm from "../../components/CocktailForm/CocktailForm.jsx"
import EditCocktail from "../../components/EditCocktail/EditCocktail.jsx"
import {createCocktail, deleteCocktail} from "../../services/locationService"
import { getAllCocktails } from "../../services/locationService"
import * as cocktailServices from "../../services/cocktailService"
import styles from "./BarDetails.module.css"
import * as authService from '../../services/authService'

const BarDetails = (props) => {
  // const navigate = useNavigate()
  const location = useLocation() 
 
  const bar = location.state
  const user = authService.getUser()

  const [cocktails, setCocktails] = useState([])
  const [component, setComponent] = useState([])

  function handleCreateCocktail(formData) {
    createCocktail(formData)
    .then(newCocktail => setCocktails([...cocktails,newCocktail])) 
  }

  const handleDeleteCocktail = id => {
		deleteCocktail(id)
		.then(deletedCocktail => {
			setCocktails(cocktails.filter(cocktail => cocktail._id !== deletedCocktail._id))
		})
	}

  const handleEditCocktail = (formData) => {
    cocktailServices.editCocktail(formData)
    .then(editedCocktail => {
      const newCocktailArray = cocktails.map(cocktail=> cocktail._id === editedCocktail._id ? editedCocktail: cocktail)
			setCocktails(newCocktailArray)
      setComponent([])
    })
  }

  const addComponent = (cocktail) => {
    setComponent((<EditCocktail cocktailID={cocktail._id} cocktail={cocktail} resetComponent={setComponent} barID={bar.id} handleEditCocktail={handleEditCocktail}/>))
  }

  useEffect(() => {
    getAllCocktails(bar.id)
    .then(allCocktails => setCocktails(allCocktails))
  },[])

  useEffect(() => {
    getAllCocktails(bar.id)
    .then(allCocktails => setCocktails(allCocktails))
  },[component])

  return (
    <div className={styles.barDetailPage} >
      <div className={styles.locationCard}>
        <Link className={styles.resultsBtnContainer} to="/search">
          <button className={styles.resultsBtn}>Back to Results</button>
        </Link >
          <img className={styles.locationImage} src={bar.image_url }alt={bar.name} />
            <h2 className={styles.locationName}>{bar.name}</h2>
          <div className={styles.locationInfoGrid}>
            <p className={styles.locationLocation}>{bar.location.display_address}</p>
            {/* FIX MISSING SPACE IN ADDRESS */}
            <p className={styles.locationPhone} >{bar.display_phone}</p>
            {bar.is_closed ? <p className={styles.locationOPen} >We're currently closed</p> : <p className={styles.locationOPen} >We're currently open</p>}
            <p className={styles.locationRating} >Rating: {bar.rating}</p>
            <p className={styles.locationPrice} >Price: {bar.price}</p>
            <a className={styles.locationLink} href={`${bar.url}`}>Yelp Link</a>
          </div>
      </div>
      <CocktailForm handleCreateCocktail={handleCreateCocktail} barID={bar.id} /> 
      <div className={styles.cocktailContainer}>
          {cocktails && cocktails.map(cocktail=> 
          <div className={styles.cocktailComment} >
            <div className={styles.cocktailCommentText} >
            <p className={styles.cocktailText}>Author: {cocktail.author.name}</p>
            <p className={styles.cocktailText}>Cocktail Name: {cocktail.name}</p>
            <p className={styles.cocktailText}>Description: {cocktail.content}</p>
            </div>
            <div className={styles.editBtnContainer}>
              { (user.profile === cocktail.author._id)  && <button className={styles.deleteCocktailBtn} onClick={()=>handleDeleteCocktail(cocktail._id)}>DELETE</button> } 
              { (user.profile === cocktail.author._id)  && <button className={styles.editCocktailBtn} onClick={()=>addComponent(cocktail)}>EDIT</button>}
            </div>
          </div> 
            )
          }  
        </div> 
        <div>
          {component}
        </div>
    </div>
  );
}

export default BarDetails;