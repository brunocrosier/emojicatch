import React from 'react'

const DomainResults = props => {
  
      return props.lookedUpDomainsArray.map((url, index) => {
          return <div key={index}>{url.url} {url.status}</div>
      })
    
  };

  export default DomainResults