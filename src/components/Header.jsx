import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, show }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button
                text={show ? 'Close' : 'Add'}
                color={show ? '#E74646' : '#a77917'}
                onClick={onAdd}
            />}
        </header>
    )
}
Header.propTypes = {
    title: PropTypes.string.isRequired
}
export default Header