import React from 'react'
import Prelaoder from '../components/Preloader/Preloader'


export const WithSuspense = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<Prelaoder />} >
            <Component {...props} />
        </React.Suspense>
    };
} 

