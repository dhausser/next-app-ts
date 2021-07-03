import * as React from 'react'
import { Layout, Breadcrumb } from 'antd'
import Product from '../components/product'

const { Content } = Layout

export default function Home() {
  return (
    <Layout className="layout">
      <Content style={{ padding: '50px 50px' }}>
        <div className="site-layout-content">
          <Product />
        </div>
      </Content>
    </Layout>
  )
}
