import { useMemo, useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useReports } from './hooks/useReports'
import { useSubmissions } from './hooks/useSubmissions'
import { FORMS, COLS } from './data/forms'
import { WEEKLY } from './data/weekly'
import { FORM_ALERTS } from './data/alerts'
import { FORM_SCHEMA } from './data/schema'
import { BASE_ROWS } from './data/rows'
import { TopBar } from './components/layout/TopBar'
import { HeroStatBar } from './components/layout/HeroStatBar'
import { ViewSwitcher } from './components/layout/ViewSwitcher'
import { FormSelector } from './components/layout/FormSelector'
import { SubmissionsView } from './components/views/SubmissionsView'
import { AnalyticsView } from './components/views/AnalyticsView'
import { ReportsView } from './components/views/ReportsView'
import { AlertsView } from './components/views/AlertsView'
import { AnswerFormView } from './components/views/AnswerFormView'
import type { FormType, ViewTab } from './types'

function AppShell() {
  const C = useTheme()
  const [activeFormType, setActiveFormType] = useState<FormType>('daily')
  const [activeTab, setActiveTab] = useState<ViewTab>('submissions')

  const { addRow, getRows } = useSubmissions()
  const { getReports, generateReport, isLoading, getError } = useReports()

  const activeForm = useMemo(
    () => FORMS.find((f) => f.type === activeFormType) ?? FORMS[0],
    [activeFormType],
  )

  const rows = getRows(activeFormType)
  const baseRows = BASE_ROWS[activeFormType]
  const cols = COLS[activeFormType]
  const weekly = WEEKLY[activeFormType]
  const alerts = FORM_ALERTS[activeFormType]
  const schema = FORM_SCHEMA[activeFormType]

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TopBar />

      {activeTab !== 'answer' && <HeroStatBar rows={rows} baseRows={baseRows} />}

      <FormSelector forms={FORMS} active={activeFormType} onChange={setActiveFormType} />
      <ViewSwitcher active={activeTab} onChange={setActiveTab} />

      {activeTab === 'submissions' && (
        <SubmissionsView rows={rows} cols={cols} formName={activeForm.name} />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView weekly={weekly} formName={activeForm.name} />
      )}

      {activeTab === 'reports' && (
        <ReportsView
          formName={activeForm.name}
          reports={getReports(activeFormType)}
          loading={isLoading(activeFormType)}
          error={getError(activeFormType)}
          onGenerate={() => { void generateReport(activeFormType) }}
        />
      )}

      {activeTab === 'alerts' && (
        <AlertsView alerts={alerts} formName={activeForm.name} />
      )}

      {activeTab === 'answer' && (
        <AnswerFormView
          schema={schema}
          formType={activeFormType}
          formName={activeForm.name}
          onAddRow={(row) => addRow(activeFormType, row)}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}

export default App
