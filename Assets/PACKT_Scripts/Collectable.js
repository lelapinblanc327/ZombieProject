var sound : AudioClip;

function OnTriggerEnter (other : Collider)
{
	if (sound)
	{
		AudioSource.PlayClipAtPoint(sound, transform.position);
	}

}

	
