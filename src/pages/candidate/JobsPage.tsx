import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { Input, Select } from '../../components/common/Input'
import { JobCard } from '../../components/ui/JobCard'
import { DEMO_JOBS, INDUSTRIES, COUNTRIES } from '../../data/content'

type FilterTab = 'all' | 'featured' | 'urgent' | 'recent'

export function JobsPage() {
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('')
  const [country, setCountry] = useState('')
  const [tab, setTab] = useState<FilterTab>('all')

  const filteredJobs = useMemo(() => {
    let jobs = [...DEMO_JOBS]

    if (tab === 'featured') jobs = jobs.filter((j) => j.is_featured)
    if (tab === 'urgent') jobs = jobs.filter((j) => j.is_urgent)
    if (tab === 'recent') jobs = [...jobs].reverse()

    if (search) {
      const q = search.toLowerCase()
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.industry.toLowerCase().includes(q),
      )
    }
    if (industry) jobs = jobs.filter((j) => j.industry === industry)
    if (country) jobs = jobs.filter((j) => j.country === country)

    return jobs
  }, [search, industry, country, tab])

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All Jobs' },
    { key: 'featured', label: 'Featured' },
    { key: 'urgent', label: 'Urgent' },
    { key: 'recent', label: 'Recent' },
  ]

  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1>Find Your Dream Job</h1>
          <p className="mt-3">Browse global opportunities across industries and countries</p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-border/50 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              label="Search"
              placeholder="Job title, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              label="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              options={INDUSTRIES.map((i) => ({ value: i, label: i }))}
            />
            <Select
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              options={COUNTRIES.map((c) => ({ value: c, label: c }))}
            />
            <div className="flex items-end">
              <button
                onClick={() => { setSearch(''); setIndustry(''); setCountry(''); setTab('all') }}
                className="w-full px-4 py-3 rounded-lg border border-border text-sm text-accent/60 hover:bg-accent/5 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                tab === t.key
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-accent/60 border border-border hover:border-secondary/30'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <img src="/icons/search.svg" alt="" className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <h4>No jobs found</h4>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
