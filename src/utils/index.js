import monsterUser from '../assets/monsterUser.svg'

export const onImageLoadingError = (event) => {
    event.target.src = monsterUser
}