import React, { useState } from 'react'
import './Home.css'
import Header from '../../Header/Header'
import ExploreMenu from '../../ExploreMenu/ExploreMenu'
// import FoodDisplay from '../../foodDisplay/FoodDisplay'
import FoodDisplay from '../../FoodDisplay/FoodDisplay'
import AppDownload from '../../Appdownload/AppDownload'

const home = () => {
  
    const [category,setCategory]=useState("All");
  
    return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
        <AppDownload/>
         
    </div>
  )
}

export default home