import Layout from '../components/admin/Layout';
import Header from '../components/admin/Header';
import StatCard from '../components/admin/StatCard';
import GraphCard from '../components/admin/GraphCard';

export default function Dashboard() {
  return (
    <Layout>
      <Header />
      
      {/* Top cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          icon="money-bill-wave"
          title="Today's Money"
          value="$53k"
          change="+55%"
          description="than last week"
        />
        <StatCard 
          icon="users"
          title="Today's Users"
          value="2,300"
          change="+3%"
          description="than last month"
        />
        <StatCard 
          icon="user-plus"
          title="New Clients"
          value="3,462"
          change="-2%"
          description="than yesterday"
        />
        <StatCard 
          icon="chart-bar"
          title="Sales"
          value="$103,430"
          change="+5%"
          description="than yesterday"
        />
      </section>
      
      {/* Graph cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GraphCard 
          imageSrc="https://storage.googleapis.com/a1aa/image/bea6d139-d136-4a5c-09f0-0a3b5b36d48f.jpg"
          title="Website View"
          description="Last Campaign Performance"
          timeText="campaign sent 2 days ago"
        />
        <GraphCard 
          imageSrc="https://storage.googleapis.com/a1aa/image/3ef7311a-ef3c-44e4-c84a-c3c53437dfe1.jpg"
          title="Daily Sales"
          description="15% increase in today sales"
          timeText="updated 4 min ago"
        />
        <GraphCard 
          imageSrc="https://storage.googleapis.com/a1aa/image/a471b0ab-7599-47e7-fd80-439676202eb1.jpg"
          title="Completed Tasks"
          description="Last Campaign Performance"
          timeText="just updated"
        />
      </section>
    </Layout>
  );
}