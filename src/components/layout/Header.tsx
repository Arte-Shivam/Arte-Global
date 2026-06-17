import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import type { NavItem } from '../../types'
import { Button } from '../common/Button'
import { useAuth } from '../../contexts/AuthContext'

interface HeaderProps {
  navItems: NavItem[]
  audience: 'candidate' | 'recruiter'
}

export function Header({ navItems, audience }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  const basePath = audience === 'candidate' ? '/candidate' : '/recruiter'

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border/50">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={basePath} className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="Arte Recruitment"
              className="h-10 md:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  location.pathname === item.path
                    ? 'text-secondary bg-secondary-light'
                    : 'text-accent/70 hover:text-secondary hover:bg-secondary-light/50',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {audience === 'candidate' && (
                  <Link to="/candidate/jobs">
                    <Button variant="outline" size="sm">My Jobs</Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to={`/login?role=${audience}`}>
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to={`/register?role=${audience}`}>
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <img src={menuOpen ? '/icons/close.svg' : '/icons/menu.svg'} alt="" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border/50 bg-white overflow-hidden"
          >
            <nav className="container-custom px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === item.path
                      ? 'text-secondary bg-secondary-light'
                      : 'text-accent/70 hover:bg-accent/5',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50 mt-2">
                {user ? (
                  <Button variant="ghost" size="sm" onClick={() => { signOut(); setMenuOpen(false) }}>
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to={`/login?role=${audience}`} onClick={() => setMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">Login</Button>
                    </Link>
                    <Link to={`/register?role=${audience}`} onClick={() => setMenuOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
