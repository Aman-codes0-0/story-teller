from reportlab.pdfgen import canvas

c = canvas.Canvas("test_story.pdf")
c.drawString(100, 750, "Once upon a time, in a far away land, there lived a coding bot.")
c.drawString(100, 730, '"Hello world!" said the bot happily.')
c.save()

print("Created test_story.pdf with text")
