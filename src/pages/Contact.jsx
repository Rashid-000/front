export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <p className="text-center text-lg text-gray-600 mb-8">
          Have a question or suggestion? Reach out to us!
        </p>
        <form>
          <input type="text" placeholder="Your Name" className="w-full p-4 mb-4 border rounded-lg" />
          <input type="email" placeholder="Your Email" className="w-full p-4 mb-4 border rounded-lg" />
          <textarea placeholder="Your Message" rows="6" className="w-full p-4 mb-6 border rounded-lg"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}