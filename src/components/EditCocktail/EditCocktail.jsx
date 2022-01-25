import { useState} from 'react'
import { useLocation } from 'react-router-dom'
import styles from "./EditCocktail.module.css"


function EditCocktail(props) {
    const location = useLocation()
    const [formData, setFormData] = useState({
      name: props.cocktail.name,
      // image: '',
      content: props.cocktail.content,
      // author: '',
      barID: props.barID,
      id: props.cocktailID
    })
    console.log("FORM DATA", formData)
    console.log("TESTING PROPS REVIEWS",props)
    
    const handleChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            props.handleEditCocktail(formData)
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
        <>
        <form className={styles.editCocktailForm}
        autoComplete="off"
        onSubmit={handleSubmit}
      > 
        <p>Cocktail Name</p>
        <input className={styles.editCocktailNameInput}
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <p>Details</p>
        <textarea className={styles.editCocktailContentInput}
          value={content}
          name="content"
          onChange={handleChange}
        /> 
        
        <button className={styles.cancelEditCocktailBtn} onClick={()=> props.resetComponent([])} >CANCEL</button>
        <button className={styles.editCocktailBtn} disabled={isFormInvalid()}>SAVE</button>
      </form>
      
</>

    )


}

export default EditCocktail