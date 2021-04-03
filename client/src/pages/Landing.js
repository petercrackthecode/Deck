import React from 'react'

function Landing() {
    return (
        <div>
            <label>
              <b>Email:</b>
              <input
                name="email"
                type=""
                placeholder="Email"
                required
                className="form-control"
              />
            </label><br />
            <label>
              <b>Password:</b>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="form-control"
              />
            </label><br />
            <button
              type="submit"
              className="btn btn-light btn-outline-secondary text-center btn-style"
            >
              Sign In
            </button>

        </div>
    )
}

export default Landing
