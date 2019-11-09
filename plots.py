import pandas as pd
import matplotlib as plt

data = pd.read_csv("Devils_Shots_0.csv")

df = pd.DataFrame(data)

# plt.scatter(df["x"],df["Y"])

print(data)
# data.head()