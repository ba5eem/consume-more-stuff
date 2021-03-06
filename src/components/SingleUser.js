import React from 'react';


const SingleUser = ({user,backToUsers,handleChange,editNow,auth,edit}) => {
    return (
    <div className='eachItem'>
      <button onClick={(e)=>backToUsers(e)}>Back</button>
      {!edit ?
        <form>
          <b>User-Id:</b> {user ? user[0].id : null}<br/>
          <b>Username:{user ? user[0].username : null}</b><br/>
          <b>email:</b> {user ? user[0].email : null}<br/>
          <b>User-Status</b> {user ? user[0].userstatus : null}<br/>
        </form>
        : <form>
          <input
            type="text"
            name='username'
            placeholder={user[0].username}
            onChange={handleChange}/>
          <input
            type="text"
            name='password'
            onChange={handleChange}/>
          <input
            type="text"
            name='email'
            placeholder={user[0].email}
            onChange={handleChange}/>
            Give user admin access ->
          <input
            type="checkbox"
            name='admin'
            onChange={handleChange}/>


        </form>}
      {auth ?
      <button
        onClick={(e)=>editNow(user,e)}>
        {edit ? 'SUBMIT' : 'EDIT'}</button> : null}
    </div>
  )
}




export default SingleUser;