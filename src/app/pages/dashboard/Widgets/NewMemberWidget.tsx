/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue} from '../../../../_ejaz/assets/ts/_utils'
import {useThemeMode} from '../../../../_ejaz/partials/layout/theme-mode/ThemeModeProvider'
import { ChartFormValues } from '../../../models/chart'
import { useStore } from '../../../stores/store'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

type ChartProps = {
  chartHeight: string
}




const NewMembersWidget: React.FC<Props> = ({className, chartColor, chartHeight}) => {
 
  const { dashboardStore } = useStore();
  const { loadNewMembersData, selectedNewMembersData, loadingInitial } = dashboardStore;
  const [newMembersData, setNewMembersData] = useState<ChartFormValues>(new ChartFormValues());


  useEffect(() => {
      loadNewMembersData().then(newMembersData => setNewMembersData(new ChartFormValues(newMembersData)));
  }, [loadNewMembersData])

  const chartRefNM = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRefNM.current) {
      return
    }

    const chart = new ApexCharts(chartRefNM.current, chartOptions(chartHeight, newMembersData))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMembersData, chartRefNM, mode])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header  */}
      <div className={`card-header border-0 bg-${chartColor} py-5`}>
        <h3 className='card-title fw-bold text-white'>New Memberships</h3>

        <div className='card-toolbar'>
          {/* begin::Menu  */}
          
          {/* end::Menu  */}
        </div>
      </div>
      {/* end::Header  */}

      {/* begin::Body  */}
      <div className='card-body p-0'>
        {/* begin::Chart  */}
        <div
          ref={chartRefNM}
          className={`mixed-widget-12-chart card-rounded-bottom bg-${chartColor}`}
        ></div>
        {/* end::Chart  */}

        {/* begin::Stats  */}
        <div className='card-rounded bg-body mt-n10 position-relative card-px py-15'>
          {/* begin::Row  */}
          <div className='row g-0 mb-7'>
            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-3 text-primary fw-bold'>Today</div>
              <div className='fs-1 fw-bold text-gray-800'>{newMembersData.value1}</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}
          {/* begin::Row  */}
          <div className='row g-0 mb-7'>
            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-primary fw-bold'>This Week</div>
              <div className='fs-2 fw-bold text-gray-800'>{newMembersData.value2}</div>
            </div>
            {/* end::Col  */}

            {/* begin::Col  */}
            <div className='col mx-5'>
              <div className='fs-6 text-primary fw-bold'>This Month</div>
              <div className='fs-2 fw-bold text-gray-800'>{newMembersData.value3}</div>
            </div>
            {/* end::Col  */}
          </div>
          {/* end::Row  */}

          
        </div>
        {/* end::Stats  */}
      </div>
      {/* end::Body  */}
    </div>
  )
}

const chartOptions  = (chartHeight: string, newMembersData: ChartFormValues): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')

  
  return {
    series: [
      {
        name: 'Active Memberships',
        //data: [35, 65, 75, 55, 45, 60, 55],
        data: newMembersData.data
      }
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: newMembersData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: newMembersData.maxValue,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: ['solid', 'solid'],
      opacity: [1],
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + ' New Memberships'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['#ffffff', '#ffffff'],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 20,
        right: 20,
      },
    },
  }
}

export {NewMembersWidget}
