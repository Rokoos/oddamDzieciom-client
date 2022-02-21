export const roleBasedRedirect = (res, history) => {
  if(res.data.role ==='admin'){
    history.push('/admin-products')
  }else if(res.data.role ==='giver'){
    history.push(`/user/${res.data._id}`)
  }else {
    history.push('/')
  }
}

export const charNumber = (text, length) => length - text.length  

// export const roleBasedRedirect = (res,history) => {

//   let intended = history.location.state
//   console.log('intended', history.location.state)
//   if(intended){
//       history.push(intended.from)
//   }else{
//       if(res.data.role === 'admin'){
//           history.push('/admin/dashboard')
//       }else{
//           history.push('/')
//       }
//   }

  
// }

export const getToken = () => {
  return localStorage.getItem('userTkn')
}

export const logout = () => localStorage.removeItem('userTkn')

export const initState = {
  title: '',
  description: '',
  category: 'empty',
  sex: 'uni',
  size: '',
  image:''
}

export const locations = [
  'dolnośląskie',
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie"
    ]

export const categories = [
  'buty',
  'ubrania',
  'zabawki',
  'akcesoria sportowe',
  'dom',
  'ogród',
  'inne'
]  

export const kidSex = [
  'uni',
  'dziewczynka',
  'chłopiec'
]

export const colors = ['#F012BE', '#FFDC00', '#01FF70','#ff0066'  , '#7FDBFF',  '#ff0000', '#0074D9', '#FF4136', '#3D9970', '#FF851B', '#2ECC40',  '#39CCCC','#ffff33']



export const shoeSizes = (min, max) => {
  let sizes =[]
  for(let i = min; i <= max; i++){
    sizes.push(i.toString())
  }
  return sizes
}

export const clotheSizes = (min, max) => {
  let sizes =[]
  for(let i = min; i <= max; i=i+6){
        sizes.push(i.toString())
        sizes.push(i + '/' + (i + 6))
      }
  sizes.pop()    
  let bigSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
  return sizes.concat(bigSizes)
}

export const renderSexName = (sex) => {
  if(sex === 'boy'){
    return 'chłopiec'
  }else if(sex === 'girl'){
    return 'dziewczynka'
  }else {
    return 'unisex'
  }
}



export const termsAndConditions = [
  {
    id: 1,
    text: 'Jest jeden Jarek'
  },
  {
    id: 2,
    text: 'Jest wielu innych Jarków ale tylko ten z punktu nr 1 jest prawdziwy.'
  },
  {
    id: 3,
    text: 'Jarek za dobro wynagradza a za zło karze. '
  }
]

