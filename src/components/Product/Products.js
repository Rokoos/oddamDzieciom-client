import React, {useState, useEffect, useCallback, Fragment} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  getProductsCount, 
  filterProducts
} from '../../functions/product'
import ProductCard from './ProductCard'
import Spinner from '../Spinner'
import {
  setFilters,
  clearFilters,
  setPageNum
} from '../../actions'
import {
  categories, 
  locations, 
  shoeSizes, 
  clotheSizes,
  kidSex} from '../../utils'
import { Menu, Checkbox, Modal, Pagination} from 'antd'
import { DownSquareOutlined} from '@ant-design/icons'



const {SubMenu} = Menu

const Products = () => {

  const dispatch = useDispatch()

  const filters = useSelector(state => state.filters)
  const pageNum = useSelector(state => state.pageNum)

  const itemsOnPage = 10

  const [filteredItems, setFilteredItems] = useState([])

  const [loading, setLoading] = useState(false)
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)

  const [categoryNames, setCategoryNames] = useState([])

  const [locationNames, setLocationNames] = useState([])

  const [shoeSizesValues, setShoeSizesValues] = useState([])

  const [clothesSizesValues, setClothesSizesValues] = useState([])

  const [sexNames, setSexNames] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const handleModal = () => setModalVisible(true)

  
  useEffect(() => {
    getProductsCount({
      category: categoryNames,
      location: locationNames,
      shoeSize: shoeSizesValues,
      clothesSize: clothesSizesValues,
      sex: sexNames
    }).then(res => setProductsCount(res.data))
  }, [categoryNames, 
    locationNames, 
    shoeSizesValues,
    clothesSizesValues,
    sexNames])

  

  const fetchProducts = useCallback(() => {
    setLoading(true)
    filterProducts({
      category: categoryNames,
      location: locationNames,
      shoeSize: shoeSizesValues,
      clothesSize: clothesSizesValues,
      sex: sexNames
    }, 'createdAt','desc', page, itemsOnPage)
    .then(res => {
      setFilteredItems(res.data)
      setLoading(false)
      
    })
    
    if(categoryNames.length > 0 || locationNames.length > 0){
      dispatch(setFilters({
        category: categoryNames,
        location: locationNames,
        shoeSize: shoeSizesValues,
        clothesSize: clothesSizesValues,
        sex: sexNames
      }))
    }else{
      dispatch(clearFilters())
    }
  }, [
    page, 
    dispatch,
    categoryNames, 
    locationNames, 
    shoeSizesValues,
    clothesSizesValues,
    sexNames])

  useEffect(() => {
    setLoading(true)
    const delayed = setTimeout(() => {
      fetchProducts()
    }, 700)
    return () => clearInterval(delayed)
  }, [
    page,
    fetchProducts
  ])

  useEffect(()=> {
    setPage(pageNum)
    if(filters){
      setCategoryNames(filters.category)
      setLocationNames(filters.location)
      setShoeSizesValues(filters.shoeSize)
      setClothesSizesValues(filters.clothesSize)
      setSexNames(filters.sex)
    }
  }, [filters,pageNum])



                       /*   FILTERS functions */
  //categories

  const showCategories = () => categories.map(c => 
    <div key={c}>
        <Checkbox
        onChange={handleCategories}
        className="pb-2 pl-4 pr-4" value={c} name="category"
        checked={categoryNames.includes(c)}>
        {c}
        </Checkbox> 
        <br/>
    </div>)

    const handleCategories =  e => {
      let inTheState = [...categoryNames]
      let justChecked = e.target.value
      let foundInState = inTheState.indexOf(justChecked)

      if(foundInState === -1){
          inTheState.push(justChecked)
      }else{
          //if found pull out from the array
          inTheState.splice(foundInState, 1)
          if(!inTheState.includes('buty')){
            // console.log('jabadabadu')
            setShoeSizesValues([])
          }
          if(!inTheState.includes('ubrania')){
            // console.log('jabadabadu')
            setClothesSizesValues([])
          }

          if(!inTheState.includes('buty') || !inTheState.includes('ubrania')) {
            setSexNames([])
          }
          
      }
      setCategoryNames(inTheState)
      
  }  

//lokalizacje

  const showLocations = () => locations.map(c => 
    <div key={c}>
        <Checkbox
        onChange={handleLocations}
        className="pb-2 pl-4 pr-4" value={c} name="location"
        checked={locationNames.includes(c)}>
        {c}
        </Checkbox> 
        <br/>
    </div>)

    const handleLocations =  e => {
      let inTheState = [...locationNames]
      let justChecked = e.target.value
      let foundInState = inTheState.indexOf(justChecked)

      if(foundInState === -1){
          inTheState.push(justChecked)
      }else{
          //if found pull out from the array
          inTheState.splice(foundInState, 1)
      }
      setLocationNames(inTheState)
  } 
  
  
  // rozmiar but??w

  const showShoeSizes = () => shoeSizes(10,45).map(c => 
    <div key={c}>
        <Checkbox
        onChange={handleShoeSizes}
        className="pb-2 pl-4 pr-4" value={c} name="shoeSize"
        checked={shoeSizesValues.includes(c)}>
        {c}
        </Checkbox> 
        <br/>
    </div>)

    const handleShoeSizes =  e => {
      let inTheState = [...shoeSizesValues]
      let justChecked = e.target.value
      let foundInState = inTheState.indexOf(justChecked)

      if(foundInState === -1){
          inTheState.push(justChecked)
      }else{
          //if found pull out from the array
          inTheState.splice(foundInState, 1)
      }
      setShoeSizesValues(inTheState)
  } 

  //rozmiar ubra??

  const showClothesSizes = () => clotheSizes(44, 170).map(c => 
    <div key={c}>
        <Checkbox
        onChange={handleClothesSizes}
        className="pb-2 pl-4 pr-4" value={c} name="clothesSize"
        checked={clothesSizesValues.includes(c)}>
        {c}
        </Checkbox> 
        <br/>
    </div>)

    const handleClothesSizes =  e => {
      let inTheState = [...clothesSizesValues]
      let justChecked = e.target.value
      let foundInState = inTheState.indexOf(justChecked)

      if(foundInState === -1){
          inTheState.push(justChecked)
      }else{
          //if found pull out from the array
          inTheState.splice(foundInState, 1)
      }
      setClothesSizesValues(inTheState)
  } 


  //p??e??

  const showSex = () => kidSex.map(c => 
    <div key={c}>
        <Checkbox
        onChange={handleKidSex}
        className="pb-2 pl-4 pr-4" value={c} name="kidSex"
        checked={sexNames.includes(c)}>
        {c}
        </Checkbox> 
        <br/>
    </div>)

    const handleKidSex =  e => {
      let inTheState = [...sexNames]
      let justChecked = e.target.value
      let foundInState = inTheState.indexOf(justChecked)

      if(foundInState === -1){
          inTheState.push(justChecked)
      }else{
          //if found pull out from the array
          inTheState.splice(foundInState, 1)
      }
      setSexNames(inTheState)
  } 

//// reset filters

  const resetFilters = () => {
    setCategoryNames([])
    setLocationNames([])
    setShoeSizesValues([])
    setClothesSizesValues([])
    setSexNames([])
    dispatch(clearFilters())
    dispatch(setPageNum(1))
  }


  const renderProducts = () => (
      <Fragment>
       
          <div className="row">
          {
            filteredItems.map(product => (
                <div
                 className=" col-md-6 col-lg-6 col-xl-4 d-flex align-items-stretch"
                  key={product._id}>
                  <ProductCard  product={product}/>
                </div>
            ))
          }
          </div>
          
          {
            productsCount > itemsOnPage && (
              <div className="text-center mt-4">
                <Pagination
                  current={page}
                  total={(productsCount / itemsOnPage) * 10}
                  onChange={value => {
                    setPage(value)
                    dispatch(setPageNum(value))
                  }}
                />
          </div>
            )
          }
          <div style={{height: '50px'}}></div>
              
        </Fragment>
  )
  return (
    <Fragment>
    <div className="container-fluid mt-5 text-center" >
        <button
            onClick={() => {
              handleModal()
              setPage(1)
              dispatch(setPageNum(1))
            }}
            style={{fontSize:"10px"}}
            className="btn btn-raised btn-primary button-display mt-5 mb-5">
            Filtry
        </button> 
    {loading ? <Spinner /> : (
      !filteredItems.length ? <h4>Nie znaleziono produkt??w</h4> :renderProducts()
    ) }
      
    </div>
    <Modal 
    className="mt-4"
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      >
      <div className="d-flex flex-column">
      <div className="btn btn-success mb-4" onClick={resetFilters}>Reset</div>
      <Menu defaultOpenKeys={["1"]} mode="inline">

            {/* category */}
                <SubMenu
                key="1" title={<span className="h6"><DownSquareOutlined/> Kategorie </span>}>
                    <div>
                   {showCategories()}
                    </div>
                </SubMenu>

            {/* lokalizacja*/}
                <SubMenu key="2" title={<span className="h6"><DownSquareOutlined/>Lokalizacja</span>}>
                    <div style={{height:'200px',overflowX:'hidden', overflowY:'scroll'}}>
             {showLocations()}
                    </div>
                </SubMenu>

                {/* buty*/}
                {
                  categoryNames.includes('buty') && (
                    <SubMenu
                key="3" title={<span className="h6"><DownSquareOutlined/>Rozmiar but??w </span>}>
                    <div style={{height:'200px',overflowX:'hidden', overflowY:'scroll'}}>
                   {showShoeSizes()}
                    </div>
                </SubMenu>
                  )
                }
                {/* ubrania*/}
                {
                  categoryNames.includes('ubrania') && (
                    <SubMenu
                key="4" title={<span className="h6"><DownSquareOutlined/>Rozmiar ubra?? </span>}>
                    <div style={{height:'200px',overflowX:'hidden', overflowY:'scroll'}}>
                   {showClothesSizes()}
                    </div>
                </SubMenu>
                  )
                }

                {/* p??e??*/}
               {
                 (categoryNames.includes('buty') || categoryNames.includes('ubrania')) && (
                  <SubMenu key="5" title={<span className="h6"><DownSquareOutlined/>P??e?? </span>}>
                  <div>
                 {showSex()}
                  </div>
              </SubMenu>
                 )
               }

            </Menu>
            </div>
      </Modal>
    </Fragment>
  )
}

export default Products