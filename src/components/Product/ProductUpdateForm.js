import React, {Fragment} from 'react'
import {
  charNumber,
  shoeSizes,
  clotheSizes } from '../../utils'

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  ctgs,
  values,
}) => {

  const {title, description, category, size, sex} = values

  const shoesOrClothes = () => {
    if(category === 'buty'){
      return (
        <select 
        name="size" 
        className="form-control"
        value={size}
        onChange={handleChange}>
          <option value='empty'>Wybierz</option>
          {shoeSizes(10,45).map(b => <option key={b}>{b}</option>)}
        </select>
      )
    } else if(category === 'ubrania') {
      return (
        <select 
        name="size" 
        className="form-control"
        value={size}
        onChange={handleChange}>
          <option value='empty'>Wybierz</option>
          {clotheSizes(44, 170).map(b => <option key={b}>{b}</option>)}
        </select>
      )
    }
  }


    // console.log('category',category)

    const renderSizeAndSex = () => (
      <Fragment>
        <div className="form-group">
        <label >Rozmiar</label>
        {
          shoesOrClothes()
        }
        </div>

        <div className="form-group">
          <label >Płeć</label>
          <select 
          name="sex" 
          value={sex}
          className="form-control"
          onChange={handleChange}>
            <option value="uni">Uni</option>
            <option value="chłopiec">Chłopiec</option>
            <option value="dziewczynka">Dziewczynka</option>
          </select>
        </div>
    </Fragment>
    )

    const disableButton = () => {
      if(title.length === 0 || title.length > 50 || description.length > 500 || category === 'empty'){
        return true
      }
    }

    let sizes 
    if(category === 'buty' || category ==='ubrania') sizes = true
    // console.log('sizes', sizes)
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label >Nazwa <span style={{color:'red'}}>*</span></label>
        <input
        placeholder="Podaj nazwe"
        type="text"
        name="title"
        className="form-control"
        value={title}
        onChange={handleChange}
        />
      </div>
      {charNumber(title, 50) < 0 ? <p style={{color: 'red'}}>{charNumber(title, 50)}</p> : <p style={{color:'#777'}}>{title.length} of 50</p>} 

      <div className="form-group">
        <label >Opis</label>
        <textarea
        placeholder="Podaj opis"
        name="description"
        className="form-control"
        value={description}
        onChange={handleChange}
        />
        </div>
        {charNumber(description, 500) < 0 ? <p style={{color: 'red'}}>{charNumber(description, 500)}</p> : <p style={{color:'#777'}}>{description.length} of 500</p>} 

        <div className="form-group">
          <label >Kategoria <span style={{color:'red'}}>*</span></label>
          <select 
          name="category" 
          className="form-control"
          onChange={handleChange}
          value={values.category}
          >
            
            {ctgs.map(b =>  <option key={b}>{b}</option>
            )}
          </select>
        </div>

        {
          sizes && renderSizeAndSex()
        }

        <br/>
        <div className="rokus-text">
          <p ><span style={{color:'red'}}>*</span>{` Pola wymagane`}</p>
        </div>
      <button disabled={disableButton()} className="btn btn-raised btn-primary">Edytuj produkt</button>

    </form>
  )
}

export default ProductUpdateForm
