import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        // constructor () {
        //     // So right here for example.
        // }

        state = {
            error: null
        }

        // Can also use the constructor instead of comonentWillMount due to depracation
        componentWillMount () {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
                console.log(error)
            })
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.request.eject(this.responseInterceptor)
            // console.log('Ejected commands ran', this.requestInterceptor, this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}


export default withErrorHandler