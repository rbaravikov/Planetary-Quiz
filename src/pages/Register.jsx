const Register = () => {
  return (
    <div className="newUser">
        <form action="">
            <h1>Register your name</h1>
            <label>
                User:<br />
                <input type="text" placeholder="Input your username here..."/>
            </label>
            <label>
                Age:<br />
                <input type="Number" placeholder="Input your age here..."/>
            </label>
            <button type="submit">Create user</button>
        </form>

    </div>
  )
}

export default Register