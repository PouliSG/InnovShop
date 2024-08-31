import styled from 'styled-components'
import ErrorDark from '../assets/404_dark.png'
import ErrorLight from '../assets/404_light.png'
import { useTheme } from '../utils/context'

const ErrorWrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  align-items: center;
`

const ErrorTitle = styled.h1`
  color: var(--text-color);
  font-weight: 300;
`

const ErrorSubtitle = styled.h2`
  font-weight: 300;
  color: var(--text-color);
`

const Illustration = styled.img`
  max-width: 800px;
`

function Error() {
  const { theme } = useTheme()

  return (
    <ErrorWrapper>
      <ErrorTitle>Oups...</ErrorTitle>
      <Illustration src={theme === 'dark' ? ErrorDark : ErrorLight} />
      <ErrorSubtitle>
        Il semblerait que la page que vous cherchez n’existe pas.
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}

export default Error
