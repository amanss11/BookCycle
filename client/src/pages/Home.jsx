function Home() {
    return (
        <>
            <div className="bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Second-Hand Books Marketplace
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Discover amazing books at great prices from fellow book lovers.
                    </p>

                    {/* Placeholder for book listings */}
                    <div className="text-center py-12">
                        <p className="text-gray-500">Book listings will appear here...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;