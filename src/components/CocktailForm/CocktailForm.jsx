import  { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { getAllCocktails } from "../../services/locationService"
import styles from "./CocktailForm.module.css"

function CocktailForm(props) {
    
  const [formData, setFormData] = useState({
      name: '',
      image: '',
      content: '',
      author: '',
      barID: props.barID
  })
  console.log("TESTING PROPS REVIEWS",props)

  const handleChange = e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

  const handleSubmit = e => {
      e.preventDefault()
      try {
          props.handleCreateCocktail(formData)
          setFormData({content:'', name:'',author:'',barID: '',image:''})
          
      } catch (err) {
          console.log(err)
      }
  }

  const { name, image, content, author } = formData

  const isFormInvalid = () => {
      return !(name && content)
    }

  console.log("=====>",props)

  return (
    <div className={styles.cocktailFormContainer}>
      <form className={styles.cocktailForm}
          autoComplete="off"
          onSubmit={handleSubmit}
        > 
        <p>Cocktail Name</p>
        <input className={styles.newCocktailNameInput}
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <p>Description</p>
        <textarea className={styles.newCocktailContentInput}
          value={content}
          name="content"
          onChange={handleChange}
        /> 
        <button className={styles.newCocktailBtn} disabled={isFormInvalid()}>Post</button>
      </form>
    </div>
  )
}

export default CocktailForm