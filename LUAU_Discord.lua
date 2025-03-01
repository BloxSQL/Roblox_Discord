local module = {}
local BotMethods = {}
local Enums = {}
local HttpService = game:GetService("HttpService")

BotMethods.__index = BotMethods

Enums.Status = {
	Playing = { Status = "playing", State = 1 },
	Streaming = { Status = "streaming", State = 2 },
	Listening = { Status = "listening", State = 3 },
	Watching = { Status = "watching", State = 4 },
	Competing = { Status = "competing", State = 5 }
}


function module:GetBot(Host: string)
	local url = string.format("%s/status", Host)

	local response = HttpService:JSONDecode(HttpService:GetAsync("http://localhost:3000/check"))

	if response["status"] == "online" then
		local self = setmetatable({}, BotMethods)
		print(string.format("Logged in as %s", response["username"]))

		self.Host = Host
		return self
	else
		error("NO BOT FOUND")
	end
end


function BotMethods:SetStatus(Status: { Status: string, State: number }, Message: string)
	local Host = self.Host

	local requestData = {
		status = Message,
		type = Status.Status
	}

	local jsonData = HttpService:JSONEncode(requestData)
	local url = Host .. "/status"

	local response
	local success, err = pcall(function()
		response = HttpService:PostAsync(url, jsonData, Enum.HttpContentType.ApplicationJson, false)
	end)

	if success then
		local responseData = HttpService:JSONDecode(response)
		print("Status updated successfully:", responseData)
	else
		warn("Failed to update status:", err)
	end
end

module.Enums = Enums
return module
