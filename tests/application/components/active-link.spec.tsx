import { render, screen, RenderResult } from '@testing-library/react'
import { ActiveLink } from '../../../src/application/components/header/active-link'

jest.mock('next/router', () => ({ useRouter() { return { asPath: '/' } } }))

type SutProps = {
  path?: string
}

const makeSUT = ({ path = '/' }: SutProps): RenderResult => {
  return render(
    <ActiveLink href={path}>
      <a>Home</a>
    </ActiveLink>
  )
}

describe('Active Link Component', () => {
  beforeEach(() => {
    makeSUT({})
  })

  test('active link renders correctly', () => {
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('active link is receiving active class', () => {
    expect(screen.getByText('Home')).toHaveClass('active')
  })
})