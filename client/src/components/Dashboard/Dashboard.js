import React, { Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'


const Dashboard = ({ auth: {user, loading, isAuthenticated} }) => {
    if(!isAuthenticated){
        return <Redirect to="/login" />
    }

    return loading ? <Spinner /> : <Fragment >
        <h1 className="large text-primary" >Dashboard</h1>
        <p className="lead" ><i className="fas fa-user" ></i> Welcome { user && user.username }</p>
        <Fragment>
            <div className="my-2" >
                <button className="btn btn-danger" >
                    <i className="fas fa-user-minus" ></i>Delete my accont
                </button>
            </div>
        </Fragment>
    </Fragment>
}

Dashboard.propTypes = {
    auth:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Dashboard)
