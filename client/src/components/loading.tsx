import { Spin } from 'antd'
import React from 'react'

function Loading() {
  return (
    <div className="loading">
        <Spin size="large" tip="loading..."></Spin>
    </div>
  )
}

export default Loading