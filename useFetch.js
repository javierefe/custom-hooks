import { useState, useEffect, useRef } from 'react'

export const useFetch = ( url ) => {
    
    const isMounted = useRef(true)

    const [state, setState] = useState({data:null, loading:true, error:null});

    // este useEffect se 'ejecuta cuando se desmonta el componente
    // donde es llamando este hook por ejemplo MultipleCustomHook
    useEffect(() => {
        
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        
        setState({data:null, loading:true, error:null});

        fetch( url )
            .then( resp => resp.json())
            .then( data => {

                setTimeout(() => {

                    if (isMounted.current){
                        setState({
                            loading: false,
                            error: null,
                            data
                        });
                    }else{
                        console.log('setState no se llamo')
                    }
                },4000)
            })
    }, [url]); // se ejecuta cuando cambia el url

    
    return state;
}
