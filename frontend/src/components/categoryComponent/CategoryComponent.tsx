import React from 'react'
import { HomeCategoryModel } from '../../screens/home/model/HomeCategoryModel';
import './CategoryComponent.css';

interface CategoryComponentProps {
    category: HomeCategoryModel;
}

export default function CategoryComponent(props: CategoryComponentProps) {
  return (
    <div className='category-item-background'>
        <img src={props.category.image} alt={props.category.title} className='category-item-image' />
        <label className='title3Bold primaryTextLight font-custom category-item-label'>{props.category.title}</label>
    </div>
  )
}
